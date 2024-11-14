import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddQuiz() {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [editMode, setEditMode] = useState(false); // Manage form visibility
  const [questions, setQuestions] = useState([]); // Store all questions
  const { topicId } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/v1/topicQuiz/getquiz/${topicId}`);
        const quizData = response.data.quizzes[0];
        setQuestions(quizData.questions || []);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    fetchQuiz();
  }, [topicId]);

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/topicQuiz/addquiz/${topicId}`, {
        text: questionText,
        answers,
      });
      alert('Quiz added successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error adding quiz:', error);
      alert('Failed to add quiz.');
    }
  };

  const handleEditQuestion = (question) => {
    setQuestionText(question.text);
    setAnswers(question.answers);
    setEditMode(true);
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`/api/v1/topicQuiz/deleteQuestion/${questionId}`);
      setQuestions(questions.filter(question => question.id !== questionId));
      alert('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question.');
    }
  };

  const handleAddNewQuestion = () => {
    setEditMode(true);
    setQuestionText('');
    setAnswers([]);
  };

  return (
    <div className="p-8 sm:pl-80 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quiz Management</h1>
        <button
          onClick={handleAddNewQuestion}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Add New Question
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8">
          {!editMode ? (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Quiz Questions</h2>
              {questions.map((question, index) => (
                <div key={question.id} className="mb-4 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-semibold text-gray-700">{question.text}</p>
                      <ul className="list-disc pl-5">
                        {question.answers.map((answer, i) => (
                          <li key={i} className="text-gray-700">
                            {answer.text} {answer.isCorrect && <span>(Correct Answer)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Edit Quiz
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Edit Quiz</h2>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Question:</label>
                <textarea
                  value={questionText}
                  onChange={handleQuestionChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
              </div>

              <h3 className="text-xl font-semibold text-gray-700">Answers:</h3>
              {answers.map((answer, index) => (
                <div key={index} className="grid grid-cols-1 gap-2 mb-4">
                  <textarea
                    placeholder="Answer text"
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  ></textarea>
                  <label className="flex items-center text-gray-700">
                    <input
                      type="checkbox"
                      checked={answer.isCorrect}
                      onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                      className="mr-2"
                    />
                    Correct Answer
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveAnswer(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddAnswer}
                className="w-full mt-2 mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Add Another Answer
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Submit Quiz
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
