import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzesForCourse, deleteQuiz as deleteQuizAPI, createQuiz as createQuizAPI } from "./client";
import { setQuizzes, deleteQuiz, addQuiz } from "./reducer";
import { FaTrash, FaPlus } from "react-icons/fa";

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

  return (
    <div id="wd-quizzes" className="p-3">
      <h3>QUIZZES</h3>
      <button className="btn btn-primary mb-3" onClick={handleCreateQuiz}>
        <FaPlus className="me-2" /> Add Quiz
      </button>
      <ul>
        {quizzes.length === 0 ? (
          <p>No quizzes found for this course.</p>
        ) : (
          quizzes.map((quiz: any) => (
            <li key={quiz._id}>
              {quiz.title}, {quiz.points}, {quiz.dueDate}
              <FaTrash
                className="text-danger ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeQuiz(cid!, quiz._id)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
