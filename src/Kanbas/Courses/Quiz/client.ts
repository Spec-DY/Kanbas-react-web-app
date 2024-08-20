

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

// in progress
 


export const publishQuiz = async (quizId: string, isPublished: boolean) => {
  const response = await axios.put(`${COURSES_API}/${quizId}/publish`, { isPublished });
  return response.data;
};

export const copyQuiz = async (quizId: string, targetCourseId: string) => {
  const response = await axios.post(`${COURSES_API}/${quizId}/copy`, { targetCourseId });
  return response.data;
};
