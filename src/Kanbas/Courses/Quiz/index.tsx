import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzesForCourse, deleteQuiz as deleteQuizAPI, createQuiz as createQuizAPI, updateQuiz as updateQuizAPI} from "./client";
import { setQuizzes, deleteQuiz, addQuiz, publishQuiz } from "./reducer";
import { FaTrash, FaPlus, FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { fetchQuestionsForQuiz } from "./Question/client"; 
import { setQuestions } from "./Question/reducer"; 



export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes.filter((quiz: any) => quiz.courseId === cid));
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await fetchQuizzesForCourse(cid!);
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const fetchQuestions = async (quizId: string) => {
    try {
      const questions = await fetchQuestionsForQuiz(quizId);
      dispatch(setQuestions(questions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const removeQuiz = async (courseId: string, quizId: string) => {
    try {
      await deleteQuizAPI(courseId, quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handleCreateQuiz = async () => {
    const newQuizData = {
      title: "New Quiz",
      availableFrom: new Date(),
      dueDate: new Date(),
      points: 0,
      questions: [],
      isPublished: false,
    };

    try {
      const createdQuiz = await createQuizAPI(cid!, newQuizData);
      dispatch(addQuiz(createdQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quiz/${createdQuiz._id}/editor`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handlePublishQuiz = async (quizId: string, isPublished: boolean) => {
    try {
        const updatedQuiz = await updateQuizAPI(cid!, quizId, { isPublished });
        dispatch(publishQuiz({ quizId: updatedQuiz._id, isPublished: updatedQuiz.isPublished }));
        fetchQuizzes();
    } catch (error) {
        console.error("Error publishing/unpublishing quiz:", error);
    }
};


  const renderQuizStatus = (quiz: any) => {
    const now = new Date();
    if (now < new Date(quiz.availableFrom)) {
      return `Not available until ${new Date(quiz.availableFrom).toLocaleDateString()}`;
    } else if (now > new Date(quiz.dueDate)) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div className="input-group w-50">
          <span className="input-group-text bg-white"><FaRegEdit /></span>
          <input id="wd-search-quiz" className="form-control" placeholder="Search for Quiz" />
        </div>
        {currentUser.role == "FACULTY" && (
        <button className="btn btn-danger" 
                onClick={handleCreateQuiz}>
                <FaPlus className="me-1" /> 
                Quiz
        </button>
        )}
      </div>
      <h3 className="mb-3">Quizzes</h3>
      <ul className="list-group">
  {quizzes.length === 0 ? (
    <p>No quizzes found for this course.</p>
  ) : (
    quizzes.map((quiz: any) => (
      <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
        
        <div 
          className="d-flex align-items-center flex-grow-1"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/Question`)}
          style={{ cursor: 'pointer' }}
        >
          <FaCheckCircle className={quiz.isPublished ? "text-success" : "text-danger"} />
          <div className="ms-3">
            <strong>{quiz.title}</strong>
            <div>
              {renderQuizStatus(quiz)} | Due: {formatDueDate(quiz.dueDate)} | {quiz.points} pts | {quiz.questions.length} Questions
            </div>
          </div>
        </div>

        {currentUser.role === "FACULTY" && (
          <Dropdown drop="start" onClick={(e) => e.stopPropagation()}>
            <Dropdown.Toggle id="dropdown-custom-components">
              <BsThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/detail`)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => removeQuiz(cid!, quiz._id)}>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePublishQuiz(quiz._id, !quiz.isPublished)}>
                {quiz.isPublished ? "Unpublish" : "Publish"}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </li>
    ))
  )}
</ul>

    </div>
  );
}
