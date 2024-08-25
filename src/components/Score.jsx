import React from 'react';

const Score = ({ score, text }) => {
  return (
    <div>
      <p>
        {text}
        <br />
        <br /> {score.toFixed(2)}%
      </p>
    </div>
  );
};

export default Score;
