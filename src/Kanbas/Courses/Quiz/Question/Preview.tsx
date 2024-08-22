import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchQuestionsForQuiz } from "./client"; // 从client中引入API调用函数
import { Form, Button } from "react-bootstrap";

const QuizPreview = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestionsForQuiz(quizId!);
      setQuestions(fetchedQuestions);


      const savedAnswers = JSON.parse(localStorage.getItem(`quiz_${quizId}_answers_${currentUser._id}`) || '{}');
      setAnswers(savedAnswers);
    };

    loadQuestions();
  }, [quizId]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    questions.forEach((question) => {
      const correct = checkAnswer(question);
      if (correct) {
        calculatedScore += (question as any).points;
      }
    });

    setScore(calculatedScore);


    localStorage.setItem(`quiz_${quizId}_answers_${currentUser._id}`, JSON.stringify(answers));
  };

  const checkAnswer = (question: any) => {
    const userAnswer = answers[question._id];

    if (question.type === "Multiple Choice") {
      return question.choices?.some((choice: any) => choice.isCorrect && choice.text === userAnswer);
    } else if (question.type === "True/False") {
      return question.booleanAnswer === userAnswer;
    } else if (question.type === "Fill in the Blanks") {
      return question.stringAnswers?.some((correctAnswer: string) => correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase());
    }
    return false;
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${quizId}/Quiz/${quizId}/editor`);
  };

  return (
    <div className="p-3">
        <button 
            className="btn btn-outline-secondary" 
            onClick={()=> navigate(-1)}>
            Back
        </button><hr/>
      <h3>Quiz Preview</h3>
      {questions.map((question, index) => (
        <div key={question._id} className="border rounded p-3 mb-3">
          <h5>{`Question ${index + 1}`}</h5>
          <p>{question.question}</p>
          <Form.Group>
            {question.type === "Multiple Choice" && (
              question.choices?.map((choice: any) => (
                <Form.Check
                  key={choice.text}
                  type="radio"
                  label={choice.text}
                  name={question._id}
                  checked={answers[question._id] === choice.text}
                  onChange={() => handleAnswerChange(question._id, choice.text)}
                />
              ))
            )}
            {question.type === "True/False" && (
              <>
                <Form.Check
                  type="radio"
                  label="True"
                  name={question._id}
                  checked={answers[question._id] === true}
                  onChange={() => handleAnswerChange(question._id, true)}
                />
                <Form.Check
                  type="radio"
                  label="False"
                  name={question._id}
                  checked={answers[question._id] === false}
                  onChange={() => handleAnswerChange(question._id, false)}
                />
              </>
            )}
            {question.type === "Fill in the Blanks" && (
              <Form.Control
                type="text"
                value={answers[question._id] || ''}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              />
            )}
          </Form.Group>
        </div>
      ))}
      {score !== null && (
        <div className="alert alert-info">
          Your score is: {score} out of {questions.reduce((acc, q) => acc + (q as any).points, 0)}
        </div>
      )}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={handleEditQuiz}>Edit Quiz</Button>
        
      </div>
    </div>
  );
};

export default QuizPreview;
