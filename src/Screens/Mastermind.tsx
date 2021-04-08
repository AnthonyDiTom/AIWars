import React, { useState } from 'react';
import '../App.css';
import MM from '../Classes/MM';
import CircleButton from '../Components/CircleButton';

function Mastermind() {
  const [game, setgame] = useState(new MM());

  function changeColors() {
    console.log(game.colorsToFind);
    game.restartGame();
    setgame(game);
  }

  return (
    <div>
      <h1>Mastermind</h1>
      {game.colorsToFind.map((value, index) => (
        <CircleButton
          // key={`${value}${index}`}
          color={value}
          onclick={() => changeColors()}
        />
      ))}
    </div>
  );
}

export default Mastermind;
