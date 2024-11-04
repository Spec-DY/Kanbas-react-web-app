
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";


export default function QuizDetails() {
  const { quizId, cid } = useParams<{ quizId: string, cid: string  }>();
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === quizId)
  );
  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const navigate = useNavigate();

  if (!quiz) {
    return <p>Quiz not found.</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const totalPoints = questions.reduce((sum: number, question: any) => sum + (question.points || 0), 0);


  return (
    <div id="wd-quiz-details" className="p-3">

        <button 
            className="btn btn-outline-secondary" 
            onClick={()=> navigate(`/Kanbas/Courses/${cid}/Quiz`)}>
            Back
        </button>
        <button className="btn btn-outline-secondary me-2 float-end" 
                onClick={()=>navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/editor`)}>
                <BsPencil className="me-2"/>
                Edit
        </button>
        <button className="btn btn-outline-secondary me-2 float-end"
                onClick={()=>navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/Preview`)}>
                Preview</button>

        <hr/>
        <h3 className="d-inline">
            {quiz.title}
        </h3>
        <span className={`badge bg-${quiz.isPublished ? 'success' : 'danger'} ms-2 d-inline`}>
                            {quiz.isPublished ? 'Published' : 'Unpublished'}
        </span>

      <div className="d-flex justify-content-center">
        <table className="table w-auto">
            <tbody>
            <tr>
                <td className="align-middle text-end"><strong>Quiz Type</strong></td>
                <td className="align-middle">{quiz.type || "Graded Quiz"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Total Points</strong></td>
                <td className="align-middle">{totalPoints}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Assignment Group</strong></td>
                <td className="align-middle">{quiz.assignmentGroup || "None"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Shuffle Answers</strong></td>
                <td className="align-middle">{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Time Limit</strong></td>
                <td className="align-middle">{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Multiple Attempts</strong></td>
                <td className="align-middle">{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>View Responses</strong></td>
                <td className="align-middle">{quiz.viewResponses || "Always"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Show Correct Answers</strong></td>
                <td className="align-middle">{quiz.showCorrectAnswers? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>One Question at a Time</strong></td>
                <td className="align-middle">{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Require LockDown Browser</strong></td>
                <td className="align-middle">{quiz.requireLockdownBrowser ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Webcam Required</strong></td>
                <td className="align-middle">{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="align-middle text-end"><strong>Lock Questions After Answering</strong></td>
                <td className="align-middle">{quiz.lockQuestions ? "Yes" : "No"}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div className="mt-4">
        <h4>Availability</h4>
        <table className="table">
            <thead>
            <tr>
                <th>Due</th>

                <th>Available from</th>
                <th>Until</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{formatDate(quiz.dueDate)}</td>
                <td>{formatDate(quiz.availableFrom)}</td>
                <td>{formatDate(quiz.availableUntil)}</td>
            </tr>
            </tbody>
        </table>
    </div>

        <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary me-2" 
                    onClick={()=>navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/Preview`)}>Preview</button>
            <button className="btn btn-outline-secondary" 
                    onClick={()=>navigate(`/Kanbas/Courses/${cid}/Quiz/${quiz._id}/editor`)}>
                    <BsPencil className="me-2"/>
                    Edit
            </button>
        </div>
    </div>
  );
}
