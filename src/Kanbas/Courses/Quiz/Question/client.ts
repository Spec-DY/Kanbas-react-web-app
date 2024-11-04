import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Fetch all questions for a specific quiz
export const fetchQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

// Create a new question
export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

// Fetch a single question by ID
export const fetchQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Update an existing question
export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(`${QUESTIONS_API}/${questionId}`, question);
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};
