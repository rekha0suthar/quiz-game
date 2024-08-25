import React from 'react';

const Questions = ({ question, timeLeft, handleAnswer }) => {
  return (
    <div className="question" key={question.id}>
      <div className="progress-bar">
        <div
          style={{
            width: `${(timeLeft / 10) * 100}%`,
            backgroundColor: 'blue',
            height: '10px',
            borderRadius: '10px',
          }}
        ></div>
      </div>
      <h2>{question.text}</h2>
      {question.answers.map((answer) => {
        return (
          <p onClick={(e) => handleAnswer(e)} disabled={timeLeft === 0}>
            {answer}
          </p>
        );
      })}
    </div>
  );
};

export default Questions;
