import React, { useState, useEffect, useCallback } from 'react';
import Questions from './components/Questions';
import { quizData } from './questions';
import Score from './components/Score';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });
  const [showScore, setShowScore] = useState(false);
  const totalQuestions = quizData.length;

  // Calculate score
  const calcScore = useCallback(() => {
    let noOfCorrectAnswer = 0;
    let noOfSkippedAnswer = 0;
    let noOfIncorrectAnswer = 0;

    quizData.forEach((question, index) => {
      if (answers[index] === undefined) {
        noOfSkippedAnswer += 1;
      } else if (question.answers[0] === answers[index]) {
        noOfCorrectAnswer += 1;
      } else {
        noOfIncorrectAnswer += 1;
      }
    });

    setScore({
      correct: (noOfCorrectAnswer / totalQuestions) * 100,
      incorrect: (noOfIncorrectAnswer / totalQuestions) * 100,
      skipped: (noOfSkippedAnswer / totalQuestions) * 100,
    });
  }, [answers, totalQuestions]);

  // Memoize nextQuestion function
  const nextQuestion = useCallback(() => {
    setTimeLeft(10);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setTimeLeft(0);
      calcScore();
      setShowScore(true);
      console.log('Quiz finished');
    }
  }, [currentQuestionIndex, totalQuestions, calcScore]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showScore) {
      nextQuestion();
    }
  }, [timeLeft, showScore, nextQuestion]);

  // Handle option click
  const handleOptionClick = (e) => {
    e.preventDefault();
    const option = e.target.innerText; // Use innerText to get the clicked option
    setAnswers((prevAnswers) => [...prevAnswers, option]);
    nextQuestion();
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {showScore ? (
        <div className="result">
          <h2>Quiz Completed</h2>
          <div>
            <Score text="Correct" score={score.correct} />
            <Score text="Skipped" score={score.skipped} />
            <Score text="Incorrect" score={score.incorrect} />
          </div>
        </div>
      ) : (
        <Questions
          question={currentQuestion}
          handleAnswer={handleOptionClick}
          timeLeft={timeLeft}
        />
      )}
    </div>
  );
}

export default App;
