import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzesForCourse, deleteQuiz as deleteQuizAPI, createQuiz as createQuizAPI } from "./client";
import { setQuizzes, deleteQuiz, addQuiz } from "./reducer";
import { FaTrash, FaPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";


export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes.filter((quiz: any) => quiz.courseId === cid));
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      console.log("cid:", cid);
      const quizzes = await fetchQuizzesForCourse(cid!);
      dispatch(setQuizzes(quizzes));
      console.log("quizzes fetched:", quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const removeQuiz = async (courseId: string, quizId: string) => {
    try {
      await deleteQuizAPI(courseId, quizId);
      dispatch(deleteQuiz(quizId)); // refresh redux store
      console.log(`Quiz ${quizId} from course ${courseId} deleted successfully.`);
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
      console.log("Created quiz:", createdQuiz);
      navigate(`/Kanbas/Courses/${cid}/Quiz/${createdQuiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
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
    return date.toLocaleDateString(); // format date to userfriendly
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div className="input-group w-50">
          <span className="input-group-text bg-white"><FaRegEdit /></span>
          <input id="wd-search-quiz" className="form-control" placeholder="Search for Quiz" />
        </div>
        <button className="btn btn-danger" onClick={handleCreateQuiz}><FaPlus className="me-1" /> Quiz</button>
      </div>
      <h3 className="mb-3">Quizzes</h3>
      <ul className="list-group">
        {quizzes.length === 0 ? (
          <p>No quizzes found for this course.</p>
        ) : (
          quizzes.map((quiz: any) => (
            <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <FaCheckCircle className={quiz.isPublished ? "text-success" : "text-danger"} />
                <div className="ms-3">
                  <strong>{quiz.title}</strong>
                  <div>
                    {renderQuizStatus(quiz)} | Due: {formatDueDate(quiz.dueDate)} | {quiz.points} pts | {quiz.questions.length} Questions
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FaTrash className="text-danger ms-2" style={{ cursor: "pointer" }} onClick={() => removeQuiz(cid!, quiz._id)} />
                <BsThreeDotsVertical style={{ cursor: "pointer" }} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}