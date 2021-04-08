import React, { useState } from 'react';
import '../App.css';
import Mastermind from '../Classes/Mastermind';
import CircleButton from '../Components/CircleButton';

function MastermindPage() {
  const game = new Mastermind();
  const [colorsToFind, setColorsToFind] = useState(game.colorsToFind);
  const [tries, setTries] = useState(game.colorsTries);

  function restart() {
    game.restartGame();
    setColorsToFind(game.colorsToFind);
    setTries(game.colorsTries);
  }

  return (
    <div>
      <h1>Mastermind</h1>
      {colorsToFind.map((value, index) => (
        <CircleButton
          // key={`${value}${index}`}
          color={value}
          onclick={() => restart()}
        />
      ))}
    </div>
  );
}

export default MastermindPage;
