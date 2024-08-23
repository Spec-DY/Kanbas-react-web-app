import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateQuiz } from "./client";
import { setQuizzes } from "./reducer";
import { setQuestions } from "./Question/reducer";
import {fetchQuestionsForQuiz} from "./Question/client";
import { Tab, Tabs, Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import MultipleChoiceEditor from './Question/MultipleChoiceEditor';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function QuizEdit() {
  const { quizId, cid } = useParams<{ quizId: string; cid: string }>();
  const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === quizId)
  );

  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(quiz?.title || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const [quizType, setQuizType] = useState(quiz?.type || "Graded Quiz");
  const [points, setPoints] = useState(quiz?.points || 0);
  const [assignmentGroup, setAssignmentGroup] = useState(quiz?.assignmentGroup || "Quizzes");
  const [shuffleAnswers, setShuffleAnswers] = useState(quiz?.shuffleAnswers || true);
  const [timeLimit, setTimeLimit] = useState(quiz?.timeLimit || 20);
  const [multipleAttempts, setMultipleAttempts] = useState(quiz?.multipleAttempts || false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(quiz?.showCorrectAnswers || true);
  const [accessCode, setAccessCode] = useState(quiz?.accessCode || "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz?.oneQuestionAtATime || true);
  const [webcamRequired, setWebcamRequired] = useState(quiz?.webcamRequired || false);
  const [lockQuestions, setLockQuestions] = useState(quiz?.lockQuestions || false);
  const [isPublished, setPublished] = useState(quiz?.isPublished || false);
  const [dueDate, setDueDate] = useState(quiz?.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(quiz?.availableFrom || "");
  const [availableUntil, setAvailableUntil] = useState(quiz?.availableUntil || "");
  const [totalPoints, setTotalPoints] = useState(0);



  const handleSave = async () => {
    const updatedQuiz = {
      ...quiz,
      title,
      description,
      type: quizType,
      points: totalPoints,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestions,
      dueDate,
      availableFrom,
      availableUntil,
    };
    try {
      await updateQuiz(cid!, quizId!, updatedQuiz);
      dispatch(setQuizzes([updatedQuiz]));
      navigate(`/Kanbas/Courses/${cid}/Quiz/${quizId}/detail`);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quiz`);
  };

  const handleSavePublish = async () => {
    try {
      const updatedQuiz = {
        ...quiz,
        isPublished: true,
      };

      // pass updated quiz
      await updateQuiz(cid!, quizId!, updatedQuiz);

      // update redux store
      dispatch(setQuizzes([updatedQuiz]));
      
      navigate(`/Kanbas/Courses/${cid}/Quiz`);
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };
  


  const handleCreateMultipleChoice = () => {
    navigate(`/Kanbas/Courses/${cid}/Quiz/${quizId}/MultipleChoice`);
  };

  const handleCreateFillInBlank = () => {
    navigate(`/Kanbas/Courses/${cid}/Quiz/${quizId}/FillInBlank`);
  };

  const handleCreateTrueFalse = () => {
    navigate(`/Kanbas/Courses/${cid}/Quiz/${quizId}/TrueFalse`);
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline'],  
    [{ 'header': [1, 2, 3, false] }],  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
  ];

  useEffect(() => {
    const calculateTotalPoints = () => {
      const total = questions.reduce((sum: number, question: any) => sum + question.points, 0);
      setTotalPoints(total);
    };
    
    if (questions.length > 0) {
      calculateTotalPoints();
    }
  }, [questions]);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestionsForQuiz(quizId!);
      dispatch(setQuestions(fetchedQuestions));
    };
    loadQuestions();
  }, [quizId, dispatch]);


  
  return (
    <div className="p-3">
      <button 
            className="btn btn-outline-secondary" 
            onClick={()=> navigate(-1)}>
            Back
      </button><hr/>
      <h3>Edit Quiz</h3>
      <Tabs defaultActiveKey="details" id="quiz-edit-tabs">
        <Tab eventKey="details" title="Details">
          <Form.Group controlId="quizTitle" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="quizDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <ReactQuill value={description} onChange={setDescription} modules={{ toolbar: toolbarOptions }}/>
          </Form.Group>

          <Form.Group controlId="quizType" className="mt-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Control as="select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="totalPoints" className="mt-3">
            <Form.Label>Total Points</Form.Label>
            <Form.Control type="number" value={totalPoints} readOnly />
          </Form.Group>

          <Form.Group controlId="assignmentGroup" className="mt-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Control as="select" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </Form.Control>
          </Form.Group>


          <Form.Group controlId="timeLimit" className="mt-3">
            <Form.Label>Time Limit (Minutes)</Form.Label>
            <Form.Control
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </Form.Group>


          <Form.Group controlId="accessCode" className="mt-3">
            <Form.Label>Access Code</Form.Label>
            <Form.Control type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="showCorrectAnswers" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Show Correct Answers"
              checked={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="oneQuestionAtATime" className="mt-3">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={oneQuestionAtATime}
              onChange={(e) => setOneQuestionAtATime(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="webcamRequired" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={webcamRequired}
              onChange={(e) => setWebcamRequired(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="lockQuestions" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={lockQuestions}
              onChange={(e) => setLockQuestions(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="shuffleAnswers" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="multipleAttempts" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.checked)}
            />
          </Form.Group>






          <Form.Group controlId="dueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="availableFrom" className="mt-3">
            <Form.Label>Available from</Form.Label>
            <Form.Control type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="availableUntil" className="mt-3">
            <Form.Label>Available Until</Form.Label>
            <Form.Control type="date" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="danger" onClick={handleSavePublish}>Save & Publish</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </Tab>
        <Tab eventKey="questions" title="Questions">
        <div className="d-flex align-items-center justify-content-between mt-3">
            <DropdownButton id="dropdown-basic-button" title="+ New Question">
              <Dropdown.Item onClick={handleCreateMultipleChoice}>Multiple Choice</Dropdown.Item>
              <Dropdown.Item onClick={handleCreateTrueFalse}>True/False</Dropdown.Item>
              <Dropdown.Item onClick={handleCreateFillInBlank}>Fill in Blank</Dropdown.Item>
            </DropdownButton>
            <div className="ms-3">
              Total points: {totalPoints}
            </div>
            
        </div>

          <ListGroup className="mt-3">
  {questions.map((question: any) => (
    <ListGroup.Item key={question._id} className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{question.title}</strong> ({question.points} pts)
      </div>
      <Button 
        variant="outline-primary" 
        onClick={() => {
          let path = "";
          switch (question.type) {
            case "Multiple Choice":
              path = "MultipleChoice";
              break;
            case "True/False":
              path = "TrueFalse";
              break;
            case "Fill in the Blanks":
              path = "FillInBlank";
              break;
            default:
              break;
          }
          navigate(`/Kanbas/Courses/${cid}/Quiz/${quizId}/${path}/${question._id}`);
        }}
      >
        Edit
      </Button>
    </ListGroup.Item>
  ))}
</ListGroup>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </Tab>
 
      </Tabs>
    </div>
  );
}
