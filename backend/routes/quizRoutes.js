const { PrismaClient } = require('@prisma/client');
const express = require('express');

const router = express.Router();
const prisma = new PrismaClient();

// CREATE: Add a quiz question and answers to a specific topic
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

// READ: Get all questions and answers for a topic
router.get('/getquiz/:topicId', async (req, res) => {
    const { topicId } = req.params;

    try {
        const quizzes = await prisma.quiz.findMany({
            where: { topicId },
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

// UPDATE: Update a question or its answers
router.put('/updatequestion/:questionId', async (req, res) => {
    const { questionId } = req.params;
    const { text, answers } = req.body;

    try {
        const updatedQuestion = await prisma.question.update({
            where: { id: questionId },
            data: { text },
        });

        await Promise.all(
            answers.map(async (answer) => {
                await prisma.answer.update({
                    where: { id: answer.id },
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    },
                });
            })
        );

        res.status(200).json({ message: "Question and answers updated successfully", question: updatedQuestion });
    } catch (error) {
        console.error("Error updating question and answers:", error);
        res.status(500).json({ error: "An error occurred while updating question and answers." });
    }
});

// DELETE: Delete a question and its answers
router.delete('/deletequestion/:questionId', async (req, res) => {
    const { questionId } = req.params;

    try {
        await prisma.answer.deleteMany({
            where: { questionId },
        });
        
        await prisma.question.delete({
            where: { id: questionId },
        });

        res.status(200).json({ message: "Question and answers deleted successfully" });
    } catch (error) {
        console.error("Error deleting question and answers:", error);
        res.status(500).json({ error: "An error occurred while deleting question and answers." });
    }
});

// DELETE: Delete a quiz and its associated questions and answers
router.delete('/deletequiz/:quizId', async (req, res) => {
    const { quizId } = req.params;

    try {
        const questions = await prisma.question.findMany({
            where: { quizId },
            include: { answers: true },
        });

        await Promise.all(
            questions.map(async (question) => {
                await prisma.answer.deleteMany({
                    where: { questionId: question.id },
                });
                await prisma.question.delete({
                    where: { id: question.id },
                });
            })
        );
 
        await prisma.quiz.delete({
            where: { id: quizId },
        });

        res.status(200).json({ message: "Quiz and all associated questions and answers deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz and associated questions and answers:", error);
        res.status(500).json({ error: "An error occurred while deleting quiz and associated questions and answers." });
    }
});

module.exports = router;
