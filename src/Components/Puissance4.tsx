import React, { useState } from 'react';
import _ from 'lodash';
import '../App.css';
import P4 from '../Classes/P4';
import CircleButton from './CircleButton';
import IAPlayer from '../Classes/IaPlayer';
import CheckBox from './CheckBox';

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

  const caseColor = (id: string): string => (id === '' ? CircleColor.empty : id);
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

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    const squaresCopy = [...board]; // Side effect, ask to peter
    squaresCopy[row][column] = player;
    setBoard(squaresCopy);

    const winPositions = P4.resultForMove(row, column, board);
    if (winPositions !== null) {
      setVictory(player, winPositions);
    }

    setNextPlayer();
    // Side effect for ia, ask to peter (see use effect)
  }

  function restart() {
    setWinner(null);
    setBoard(P4.newBoard);
  }

  function Board() {
    return (
      <div
        className="p4Board"
        style={{ borderColor: winner === null ? player : CircleColor.victory }}
      >
        {board.map((row, rowIndex) => {
          const rowKey = `RI${rowIndex}`;
          return (
            <div className="board-row" key={`${rowKey}`}>
              {row.map((value, colIndex) => {
                const key = `R${rowIndex}C${colIndex}`;
                return (
                  <CircleButton
                    key={key}
                    color={caseColor(board[rowIndex][colIndex])}
                    onclick={() => selectColumn(colIndex)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  function Winner() {
    return (
      <>
        <h6>
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
        </h6>
      </>
    );
  }

  return (
    <div>
      {winner === null ? <h3>{player} plays</h3> : <Winner />}
      <Board />
      <CheckBox
        label="Play with AI"
        isChecked={isPlayingWithAI}
        onChange={() => setIsPlayingWithAI(!isPlayingWithAI)}
      />
    </div>
  );
}

export default Puissance4;
