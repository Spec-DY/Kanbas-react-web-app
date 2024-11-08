

import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (courseId: string, quizId: string, quizData: any) => {
  const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quizData);
  return response.data;
};

 

export const publishQuiz = async (quizId: string, isPublished: boolean) => {
  const response = await axios.put(`${COURSES_API}/${quizId}/publish`, { isPublished });
  return response.data;
};

export const copyQuiz = async (quizId: string, targetCourseId: string) => {
  const response = await axios.post(`${COURSES_API}/${quizId}/copy`, { targetCourseId });
  return response.data;
};

export const fetchQuizAttemptInfo = async (quizId: string) => {
  const response = await axios.get(`${COURSES_API}/${quizId}/attempts`);
  return response.data;
};

export const submitQuizAttempt = async (quizId: string, answers: any) => {
  const response = await axios.post(`${COURSES_API}/${quizId}/submit`, { answers });
  return response.data;
};
