const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

// Create a new Project 
router.post('/addProject/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const { project } = req.body;

    const newProject = await prisma.projects.create({
      data: {
        courseId: courseId,
        project: project,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Get all Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        solutions: true, 
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Get a single Project by ID
router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.projects.findUnique({
      where: { id: id },
      include: {
        solutions: true,  
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// Update an existing project
router.put('/updateProject/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  
  try {
    const updatedProject = await prisma.projects.update({
      where: { id: projectId },
      data: { project },
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete a project
router.delete('/deleteProject/:projectId', async (req, res) => {
  const { projectId } = req.params;
  
  try {
    await prisma.projects.delete({
      where: { id: projectId },
    });
    res.status(204).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});


// Add Solution to a Project
router.post('/projects/:projectId/solutions', async (req, res) => {
  const { projectId } = req.params;
  const { link } = req.body;

  try {
    const solution = await prisma.projectSolutions.create({
      data: {
        projectId: projectId,
        link: link,
      },
    });

    res.status(201).json(solution);
  } catch (error) {
    console.error('Error adding solution:', error);
    res.status(500).json({ error: 'Error adding solution' });
  }
});

// Update Solution by ID
router.put('/solutions/:id', async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;

  try {
    const updatedSolution = await prisma.projectSolutions.update({
      where: { id: id },
      data: {
        link: link,
      },
    });

    res.status(200).json(updatedSolution);
  } catch (error) {
    console.error('Error updating solution:', error);
    res.status(500).json({ error: 'Error updating solution' });
  }
});

// Delete Solution by ID
router.delete('/solutions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.projectSolutions.delete({
      where: { id: id },
    });

    res.status(204).json({ message: 'Solution deleted successfully' });
  } catch (error) {
    console.error('Error deleting solution:', error);
    res.status(500).json({ error: 'Error deleting solution' });
  }
});

module.exports = router;
