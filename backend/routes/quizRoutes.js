const { PrismaClient } = require('@prisma/client');
const express = require('express');

const router = express.Router(); 
const prisma = new PrismaClient(); 

router.post('/addquiz/:topicId', async (req, res) => {
    const { topicId } = req.params;
    const { text, answers } = req.body; // No need to include correctAnswerId in the request body

    try {
        // Find or create the quiz
        let quiz = await prisma.quiz.findFirst({
            where: { topicId }, // Use findFirst with topicId
        });

        // If no quiz found, create a new one
        if (!quiz) {
            quiz = await prisma.quiz.create({
                data: {
                    topic: { connect: { id: topicId } }, // Connects quiz to the topic
                },
            });
        }

        // Create the question first
        const question = await prisma.question.create({
            data: {
                text,
                quiz: { connect: { id: quiz.id } }, // Connect question to the quiz
            },
            include: {
                answers: true,
            },
        });

        // Create the answers and find the correct answer ID
        const createdAnswers = await Promise.all(
            answers.map((answer) => 
                prisma.answer.create({
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        question: { connect: { id: question.id } }, // Connect answer to the question
                    },
                })
            )
        );

        // Find the ID of the correct answer
        const correctAnswer = createdAnswers.find(answer => answer.isCorrect === true);
        
        // Update the question with the correctAnswerId
        if (correctAnswer) {
            await prisma.question.update({
                where: { id: question.id },
                data: { correctAnswerId: correctAnswer.id },
            });
        }

        // Include answers in the response
        const questionWithAnswers = await prisma.question.findUnique({
            where: { id: question.id },
            include: { answers: true },
        });

        res.status(201).json({ message: "Question and answers added successfully", question: questionWithAnswers });
    } catch (error) {
        console.error("Error adding question and answers:", error);
        res.status(500).json({ error: "An error occurred while adding question and answers." });
    }
});

module.exports = router;
