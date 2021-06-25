/* eslint-disable object-curly-newline */
import _ from 'lodash';
import React, { useState } from 'react';
import Mastermind from '../../classes/Mastermind';
import CircleButton from '../fourInARow/CircleButton';

const game = new Mastermind();
function MastermindPage() {
  const [colorsToFind, setColorsToFind] = useState(game.colorsToFind);
  const [attempts, setAttempts] = useState(game.playerAttempts);

  // function restart() {
  //   game.restartGame();
  //   setColorsToFind(game.colorsToFind);
  //   setAttempts(game.playerAttempts);
  // }

  function tryColors() {
    game.playerTriesColors(Mastermind.generateRandomColors());
    console.log(`number of attempts: ${game.playerAttempts.length}`);

    // setAttempts(game.playerAttempts);
    setAttempts(_.cloneDeep(game.playerAttempts));
  }

  return (
    <div>
      {attempts.map((values, index) => {
        console.log(`rendering ${index}`);
        const key = `${values}${index}`;
        return <div key={key}>{values.join(' | ')}</div>;
      })}
      <div style={{ backgroundColor: 'white', height: '3px', margin: '10px' }} />
      {colorsToFind.map((value, index) => {
        const key = `${value}${index}`;
        return <CircleButton key={`${key}`} color={value} onclick={tryColors} />;
      })}
    </div>
  );
}

export default MastermindPage;
