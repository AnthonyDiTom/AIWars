import React, { useState } from 'react';
import _ from 'lodash';
import '../App.css';
import P4 from '../Classes/P4';
import RoundButton from './RoundButton';
import IAPlayer from '../Classes/IaPlayer';

function Puissance4() {
  enum RoundColor {
    playerRed = 'red',
    playerBlue = 'blue',
    victory = 'yellow',
    empty = 'white',
  }

  const { playerRed } = RoundColor;
  const { playerBlue } = RoundColor;

  const [board, setBoard] = useState(P4.newBoard);
  const [player, setPlayer] = useState(playerRed);
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayingWithAI, setIsPlayingWithAI] = useState(false);

  const caseColor = (id: string): string => (id === '' ? RoundColor.empty : id);
  const setNextPlayer = () =>
    setPlayer(player === playerRed ? playerBlue : playerRed);

  React.useEffect(() => {
    if (player === playerBlue && isPlayingWithAI) {
      selectColumn(IAPlayer.playColumn(board, playerBlue, playerRed));
    }
  });

  function setVictory(winnerName: string, positions: number[][]) {
    setWinner(winnerName);
    const boardCopy = _.cloneDeep(board);

    positions.forEach((value) => {
      const [row, column] = value;
      boardCopy[row][column] = RoundColor.victory;
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

    const WinPositions = P4.resultForMove(row, column, board);
    if (WinPositions !== null) {
      setVictory(player, WinPositions);
    }

    setNextPlayer();
    // Side effect for ia, ask to peter
  }

  function restart() {
    setWinner(null);
    setBoard(P4.newBoard);
  }

  function Board() {
    return (
      <div>
        {board.map((row, rowIndex) => {
          const rowKey = `RI${rowIndex}`;
          return (
            <div className="board-row" key={`${rowKey}`}>
              {row.map((value, colIndex) => {
                const key = `R${rowIndex}C${colIndex}`;
                return (
                  <RoundButton
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
          {winner} wins !
          <button
            type="button"
            style={{ marginLeft: '8px' }}
            onClick={() => restart()}
          >
            Restart
          </button>
        </h6>
      </>
    );
  }

  function AICheckbox() {
    return (
      <div style={{ border: 'white', borderWidth: '1px' }}>
        <input
          name="isGoing"
          type="checkbox"
          checked={isPlayingWithAI}
          onChange={() => setIsPlayingWithAI(!isPlayingWithAI)}
        />
        Play with AI
      </div>
    );
  }

  return (
    <div>
      {winner === null ? <h3>{player}</h3> : <Winner />}
      <Board />
      <AICheckbox />
    </div>
  );
}

export default Puissance4;
