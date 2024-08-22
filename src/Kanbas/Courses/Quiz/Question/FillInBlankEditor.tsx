import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createQuestion, fetchQuestionById, updateQuestion } from './client'; 
import { Form, Button } from "react-bootstrap";

const FillInBlankEditor = () => {
  const { quizId, questionId } = useParams<{ quizId: string; questionId?: string }>();
  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === quizId));
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState('');
  const [stringAnswers, setStringAnswers] = useState<string[]>(['']);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionId) {

      const loadQuestion = async () => {
        try {
          const fetchedQuestion = await fetchQuestionById(questionId);
          setTitle(fetchedQuestion.title);
          setPoints(fetchedQuestion.points);
          setQuestion(fetchedQuestion.question);
          setStringAnswers(fetchedQuestion.stringAnswers || ['']);
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      };
      loadQuestion();
    }
  }, [questionId]);

  const handleAddBlank = () => {
    setStringAnswers([...stringAnswers, '']);
  };

  const handleRemoveBlank = (index: number) => {
    setStringAnswers(stringAnswers.filter((_, i) => i !== index));
  };

  const handleBlankChange = (index: number, value: string) => {
    const newStringAnswers = stringAnswers.map((answer, i) => 
      i === index ? value : answer
    );
    setStringAnswers(newStringAnswers);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSave = async () => {
    const newQuestion = {
      title: questionId ? title : `Question ${quiz?.questions?.length + 1 || 1}`,
      points,
      question,
      stringAnswers,
      type: "Fill in the Blanks",
    };

    try {
      if (questionId) {

        await updateQuestion(questionId, newQuestion);
        console.log("Question updated successfully");
      } else {

        if (quizId) {
          await createQuestion(quizId, newQuestion);
          console.log("Question created successfully");
        }
      }
      navigate(-1);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div className="p-3">
      <h3>{questionId ? "Edit" : "Create"} Fill in the Blank Question</h3>

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

      <Form.Group controlId="blanks" className="mt-3">
        <Form.Label>Possible Answers</Form.Label>
        {stringAnswers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <Form.Label className="me-2">Possible Answer:</Form.Label>
            <Form.Control 
              type="text" 
              value={answer} 
              onChange={(e) => handleBlankChange(index, e.target.value)} 
            />
            {stringAnswers.length > 1 && (
              <Button 
                variant="danger" 
                className="ms-2" 
                onClick={() => handleRemoveBlank(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button variant="link" onClick={handleAddBlank}>
          + Add Another Answer
        </Button>
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>{questionId ? "Update" : "Save"} Question</Button>
      </div>
    </div>
  );
};

export default FillInBlankEditor;
