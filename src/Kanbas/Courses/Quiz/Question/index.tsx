import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsForQuiz } from "./client";
import { setQuestions } from "./reducer";
import { useParams } from "react-router-dom";
import "./index.css";

const QuestionIndex = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const dispatch = useDispatch();
  const questions = useSelector((state: any) => state.questionsReducer.questions);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
  const [results, setResults] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      console.log("start fetching questions");
      const fetchedQuestions = await fetchQuestionsForQuiz(quizId!);
      dispatch(setQuestions(fetchedQuestions));
      setLoading(false);
    };
    
    fetchData();
  }, [dispatch, quizId]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    const results: { [key: string]: boolean } = {};

    questions.forEach((question: any) => {
      let isCorrect = false;

      switch (question.type) {
        case "Fill in the Blanks":
            const normalizedUserAnswer = userAnswers[question._id]?.trim().toLowerCase();
            const normalizedCorrectAnswers = question.stringAnswers.map((answer: string) => answer.trim().toLowerCase());
          isCorrect = normalizedCorrectAnswers.includes(normalizedUserAnswer);
          break;
        case "Multiple Choice":
          const correctChoice = question.choices.find((choice: any) => choice.isCorrect);
          isCorrect = correctChoice && correctChoice.text === userAnswers[question._id];
          break;
        case "True/False":
          isCorrect = question.booleanAnswer === (userAnswers[question._id] === "true");
          break;
      }

      results[question._id] = isCorrect;
    });

    setResults(results);
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  return (
    <div>
      <h1>Quiz Questions</h1>
      {questions.map((question: any) => (
        <QuestionDisplay 
          key={question._id} 
          question={question} 
          userAnswer={userAnswers[question._id] || ''} 
          onAnswerChange={handleAnswerChange} 
          isCorrect={results[question._id]} 
        />
      ))}
      {questions.length > 0 && (
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    )}
          {questions.length <= 0 && (
        <div>No avalible questions</div>
    )}
    </div>
  );
};

const QuestionDisplay = ({ question, userAnswer, onAnswerChange, isCorrect }: 
    { question: any, userAnswer: any, onAnswerChange: (questionId: string, answer: any) => void, isCorrect: boolean | undefined }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          onAnswerChange(question._id, e.target.value);
        };
    
        return (
          <div className="question-container">
            <div className="question-header">
              <h3 className="question-title">{question.title}</h3>
              {isCorrect !== undefined && (
                <span className={isCorrect ? "correct" : "incorrect"}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              )}
            </div>
            <p>{question.question}</p>
            {question.type === "Fill in the Blanks" && (
              <input 
                type="text" 
                placeholder="Your answer" 
                value={userAnswer} 
                onChange={handleChange} 
                style={{ borderColor: isCorrect === undefined ? 'initial' : isCorrect ? 'green' : 'red' }}
              />
            )}
            {question.type === "Multiple Choice" && question.choices.map((choice: any, index: number) => (
              <div key={index}>
                <input 
                  type="radio" 
                  id={`${question._id}-${index}`} 
                  name={`question-${question._id}`} 
                  value={choice.text} 
                  checked={userAnswer === choice.text} 
                  onChange={handleChange} 
                />
                <label htmlFor={`${question._id}-${index}`}>{choice.text}</label>
              </div>
            ))}
            {question.type === "True/False" && (
              <>
                <div>
                  <input 
                    type="radio" 
                    id={`${question._id}-true`} 
                    name={`question-${question._id}`} 
                    value="true" 
                    checked={userAnswer === "true"} 
                    onChange={handleChange} 
                  />
                  <label htmlFor={`${question._id}-true`}>True</label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id={`${question._id}-false`} 
                    name={`question-${question._id}`} 
                    value="false" 
                    checked={userAnswer === "false"} 
                    onChange={handleChange} 
                  />
                  <label htmlFor={`${question._id}-false`}>False</label>
                </div>
              </>
            )}
          </div>
        );
    };
    

export default QuestionIndex;
