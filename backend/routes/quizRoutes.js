const { PrismaClient } = require('@prisma/client');
const express = require('express');

const router = express.Router(); 
const prisma = new PrismaClient(); 

// POST route to add a quiz question and answers
router.post('/addquiz/:topicId', async (req, res) => {
    const { topicId } = req.params;
    const { text, answers } = req.body; 

    try {
        // Find or create the quiz
        let quiz = await prisma.quiz.findFirst({
            where: { topicId },
        });

        if (!quiz) {
            quiz = await prisma.quiz.create({
                data: {
                    topic: { connect: { id: topicId } },
                },
            });
        }

        const question = await prisma.question.create({
            data: {
                text,
                quiz: { connect: { id: quiz.id } },
            },
            include: { answers: true },
        });

        const createdAnswers = await Promise.all(
            answers.map((answer) => 
                prisma.answer.create({
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        question: { connect: { id: question.id } },
                    },
                })
            )
        );

        const correctAnswer = createdAnswers.find(answer => answer.isCorrect === true);

        if (correctAnswer) {
            await prisma.question.update({
                where: { id: question.id },
                data: { correctAnswerId: correctAnswer.id },
            });
        }

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

// GET route to fetch all questions and answers by topicId
// GET route to fetch all questions and answers by topicId
router.get('/getquiz/:topicId', async (req, res) => {
    const { topicId } = req.params;

    try {
        // Fetch all quizzes related to the specified topicId, including their questions and answers
        const quizzes = await prisma.quiz.findMany({
            where: {topicId: topicId }, 
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        });

        if (quizzes.length === 0) {
            return res.status(404).json({ message: "No quizzes found for the given topic." });
        }

        res.status(200).json({ quizzes });
    } catch (error) {
        console.error("Error fetching quizzes, questions, and answers:", error);
        res.status(500).json({ error: "An error occurred while fetching quizzes, questions, and answers." });
    }
});


module.exports = router;
