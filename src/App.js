import Questions from './components/Questions';
import { quizData } from './questions';
import React, { useState, useEffect } from 'react';
import Score from './components/Score';
function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [ansClicked, setAnsClicked] = useState(false);
  const totalQuestions = quizData.length;

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [timeLeft, showScore]);

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(10);
    } else {
      setTimeLeft(0);
      calcScore();
      setShowScore(true);
      console.log('Quiz finished');
    }
  };

  const calcScore = () => {
    let noOfCorrectAnswer = 0;
    let noOfSkippedAnswer = 0;
    let noOfIncorrectAnswer = 0;
    quizData.forEach((question, index) => {
      if (question.answers[0] === answers[index]) {
        noOfCorrectAnswer += 1;
      } else if (answers[index] === '') {
        noOfSkippedAnswer += 1;
      } else {
        noOfIncorrectAnswer += 1;
      }
    });
    const result = (noOfCorrectAnswer / totalQuestions) * 100;
    setScore(result);
    setIncorrect((noOfIncorrectAnswer / totalQuestions) * 100);
    setSkipped((noOfSkippedAnswer / totalQuestions) * 100);
  };

  const handleOptionClick = (e) => {
    e.preventDefault();
    setAnsClicked(true);
    if (ansClicked) {
      const option = e.target.outerText;
      setAnswers((prevAnswers) => [...prevAnswers, option]);
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, '']);
    }
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
            <Score text="Correct" score={score} />
            <Score text="Skipped" score={skipped} />
            <Score text="Incorrect" score={incorrect} />
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
