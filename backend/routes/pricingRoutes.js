const { PrismaClient } = require('@prisma/client');
const express = require('express');

const router = express.Router();
const prisma = new PrismaClient();

// Create a new pricing with features
router.post('/addpricing', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newPricing = await prisma.pricing.create({
      data: {
        name,
        price:parseFloat(price),
      },
    });
    res.status(201).json(newPricing);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating pricing' });
  }
});

// Get all pricing data with features
router.get('/pricing', async (req, res) => {
  try {
    const allPricing = await prisma.pricing.findMany({
      include: {
        features: {
          include: {
            feature: true, 
          },
        },
      },
    });

    // Format the response
    const formattedPricing = allPricing.map((pricing) => ({
      pricingId: pricing.id,
      pricingName: pricing.name,
      price: pricing.price,
      features: pricing.features.map((pf) => ({
        name: pf.feature.name,
        isIncluded: pf.isIncluded,
      })),
    }));

    res.status(200).json(formattedPricing);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching pricing data' });
  }
});


router.get('/pricing/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pricing = await prisma.pricing.findUnique({
      where: { id },
      include: {
        features: {
          include: { feature: true },
        },
      },
    });

    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }

    res.status(200).json(pricing);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pricing data' });
  }
});


// Update a pricing by ID with new features
router.put('/pricing/:id', async (req, res) => {
  const { id } = req.params;
  const { price, name, featureIds } = req.body; // Assuming featureIds is the array of feature IDs

  try {
    const updatedPricing = await prisma.pricing.update({
      where: {
        id,
      },
      data: {
        price,
        name,
        features: {
          deleteMany: {}, // Clear existing features
          create: featureIds.map((featureId) => ({
            featureId,
            isIncluded: true,
          })),
        },
      },
    });
    res.status(200).json(updatedPricing);
  } catch (error) {
    res.status(500).json({ error: 'Error updating pricing' });
  }
});

// Delete a pricing by ID
router.delete('/pricing/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pricing.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting pricing' });
  }
});


router.post('/addfeature/:pricingId', async (req, res) => {
  const { pricingId } = req.params;
  const { name, isIncluded } = req.body; // Single feature data
 
  try {
    // Update pricing with the new feature
    const updatedPricing = await prisma.pricing.update({
      where: { id: pricingId },
      data: {
        features: {
          create: {
            feature: {
              connectOrCreate: {
                where: { name },
                create: { name },
              },
            },
            isIncluded,
          },
        },
      },
      include: {
        features: {
          include: { feature: true },
        },
      },
    });

    // Format the response to include only `name` and `isIncluded`
    const formattedFeatures = updatedPricing.features.map((pf) => ({
      name: pf.feature.name,
      isIncluded: pf.isIncluded,
    }));

    res.status(201).json({
      pricingId: updatedPricing.id,
      pricingName: updatedPricing.name,
      features: formattedFeatures,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding feature to pricing' });
  }
});

router.put('/updatePrice/:id', async (req, res) => {
  const { id } = req.params;
  const { price,name } = req.body;
  console.log(req.body)
  try {
    const updatedPricing = await prisma.pricing.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        
      },
    });

    res.status(200).json({
      message: 'Price updated successfully',
      pricingId: updatedPricing.id,
      pricingName: updatedPricing.name,
      updatedPrice: updatedPricing.price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating price' });
  }
});



module.exports = router;
