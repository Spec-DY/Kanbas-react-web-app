import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createQuestion, fetchQuestionById, updateQuestion } from './client';
import { Form, Button } from "react-bootstrap";

const TrueFalseEditor = () => {
  const { quizId, questionId } = useParams<{ quizId: string, questionId?: string }>();
  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === quizId));
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState('');
  const [booleanAnswer, setBooleanAnswer] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionId) {
      const loadQuestion = async () => {
        try {
          const fetchedQuestion = await fetchQuestionById(questionId);
          setTitle(fetchedQuestion.title);
          setPoints(fetchedQuestion.points);
          setQuestion(fetchedQuestion.question);
          setBooleanAnswer(fetchedQuestion.booleanAnswer);
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      };
      loadQuestion();
    }
  }, [questionId]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    const newQuestion = {
      title,
      points,
      question,
      booleanAnswer,
      type: "True/False",
    };

    try {
      if (questionId) {

        await updateQuestion(questionId, newQuestion);
        console.log("Question updated successfully");
      } else {

        if (quizId) {
          const createdQuestion = await createQuestion(quizId, newQuestion);
          console.log("Question created successfully:", createdQuestion.title);
        }
      }
      navigate(-1);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div className="p-3">
      <h3>{questionId ? "Edit" : "Create"} True/False Question</h3>

      <Form.Group controlId="points" className="mt-3">
        <Form.Label>Points</Form.Label>
        <Form.Control 
          type="number" 
          value={points} 
          onChange={(e) => setPoints(Number(e.target.value))} 
        />
      </Form.Group>

      <Form.Group controlId="questionText" className="mt-3">
        <Form.Label>Question</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="trueFalseAnswer" className="mt-3">
        <Form.Label>True/False</Form.Label>
        <div>
          <Form.Check 
            type="radio" 
            label="True" 
            name="trueFalse"
            checked={booleanAnswer === true} 
            onChange={() => setBooleanAnswer(true)} 
          />
          <Form.Check 
            type="radio" 
            label="False" 
            name="trueFalse" 
            checked={booleanAnswer === false} 
            onChange={() => setBooleanAnswer(false)} 
          />
        </div>
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>{questionId ? "Update" : "Save"} Question</Button>
      </div>
    </div>
  );
};

export default TrueFalseEditor;
