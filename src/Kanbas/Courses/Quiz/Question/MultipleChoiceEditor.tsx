import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { createQuestion, fetchQuestionById, updateQuestion } from './client';
import { useSelector, useDispatch } from "react-redux";

interface Choice {
  text: string;
  isCorrect: boolean;
}

const MultipleChoiceEditor = () => {
  const { quizId, questionId } = useParams<{ quizId: string, questionId?: string }>();
  const quiz = useSelector((state: any) => state.quizzesReducer.quizzes.find((q: any) => q._id === quizId));
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState<Choice[]>([{ text: '', isCorrect: false }]);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionId) {
      const loadQuestion = async () => {
        try {
          const fetchedQuestion = await fetchQuestionById(questionId);
          setTitle(fetchedQuestion.title);
          setPoints(fetchedQuestion.points);
          setQuestion(fetchedQuestion.question);
          setChoices(fetchedQuestion.choices);
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      };
      loadQuestion();
    }
  }, [questionId]);

  const handleAddChoice = () => {
    setChoices([...choices, { text: '', isCorrect: false }]);
  };

  const handleRemoveChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = choices.map((choice, i) => 
      i === index ? { ...choice, text } : choice
    );
    setChoices(newChoices);
  };

  const handleCorrectChoiceChange = (index: number) => {
    const newChoices = choices.map((choice, i) => 
      i === index ? { ...choice, isCorrect: true } : { ...choice, isCorrect: false }
    );
    setChoices(newChoices);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSave = async () => {
    const newQuestion = {
      title,
      points,
      question,
      choices,
      type: "Multiple Choice",
    };

    try {
      if (questionId) {
        // Update existing question
        await updateQuestion(questionId, newQuestion);
        console.log("Question updated successfully:", newQuestion.title);
      } else {
        // Create new question
        if (quizId) {
          const createdQuestion = await createQuestion(quizId, newQuestion);
          console.log("Question created successfully:", createdQuestion.title);
        }
      }
      navigate(-1); // Save and navigate back
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div className="p-3">
      <h3>{questionId ? "Edit" : "Create"} Multiple Choice Question</h3>

      <Form.Group controlId="title" className="mt-3">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </Form.Group>

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

      <Form.Group controlId="choices" className="mt-3">
        <Form.Label>Choices</Form.Label>
        {choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <Form.Check 
              type="radio" 
              name="correctChoice" 
              checked={choice.isCorrect} 
              onChange={() => handleCorrectChoiceChange(index)} 
            />
            <Form.Control 
              type="text" 
              className="ms-2" 
              value={choice.text} 
              onChange={(e) => handleChoiceChange(index, e.target.value)} 
              placeholder={`Possible Answer ${index + 1}`} 
            />
            {choices.length > 1 && (
              <Button 
                variant="danger" 
                className="ms-2" 
                onClick={() => handleRemoveChoice(index)}>
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button variant="link" onClick={handleAddChoice}>
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

export default MultipleChoiceEditor;
