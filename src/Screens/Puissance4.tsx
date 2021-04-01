import React, { useState } from 'react';
import _ from 'lodash';
import '../App.css';
import P4 from '../Classes/P4';
import IAPlayer from '../Classes/IaPlayer';
import CheckBox from '../Components/CheckBox';
import P4Board from '../Components/P4Board';

function Puissance4() {
  enum CircleColor {
    playerRed = 'red',
    playerBlue = 'blue',
    victory = 'yellow',
    empty = 'white',
  }

  const { playerRed, playerBlue } = CircleColor;

  const [board, setBoard] = useState(P4.newBoard);
  const [player, setPlayer] = useState(playerRed);
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayingWithAI, setIsPlayingWithAI] = useState(false);

  const setNextPlayer = () => setPlayer(player === playerRed ? playerBlue : playerRed);

  React.useEffect(() => {
    if (player === playerBlue && isPlayingWithAI) {
      selectColumn(IAPlayer.playColumn(board, playerBlue, playerRed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, isPlayingWithAI]);

  function setVictory(winnerName: string, positions: number[][]) {
    setWinner(winnerName);
    const boardCopy = _.cloneDeep(board);

    positions.forEach((value) => {
      const [row, column] = value;
      boardCopy[row][column] = CircleColor.victory;
    });
    setBoard(boardCopy);
  }

  function restart() {
    setWinner(null);
    setBoard(P4.newBoard);
  }

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    const squaresCopy = [...board];
    squaresCopy[row][column] = player;
    setBoard(squaresCopy);

    const winPositions = P4.resultForMove(row, column, board);
    if (winPositions !== null) {
      setVictory(player, winPositions);
    }

    setNextPlayer();
  }

  function Winner() {
    return (
      <>
        <div>
          {isPlayingWithAI && winner === playerBlue ? 'AI' : winner} wins !
          <button
            type="button"
            style={{
              marginLeft: '8px',
            }}
            onClick={() => restart()}
          >
            Restart
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      {winner === null ? `${player.toUpperCase()} plays` : <Winner />}
      <P4Board
        board={board}
        borderColor={winner === null ? player : CircleColor.victory}
        selectColumn={selectColumn}
      />
      <CheckBox
        label="Play with AI"
        isChecked={isPlayingWithAI}
        onChange={() => setIsPlayingWithAI(!isPlayingWithAI)}
      />
    </div>
  );
}

export default Puissance4;
