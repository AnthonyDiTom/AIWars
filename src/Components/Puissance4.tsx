import React, { useState } from 'react';
import _ from 'lodash';
import '../App.css';
import P4Utils from '../Classes/P4Utils';
import RoundButton from './RoundButton';
import IAPlayer from '../Classes/IaPlayer';

function Puissance4() {
  const [board, setBoard] = useState(P4Utils.newBoard);
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState<string | null>(null);
  const [isIAPlaying, setisIAPlaying] = useState(false);
  const setNextPlayer = () => setPlayer(player === 'red' ? 'blue' : 'red');

  React.useEffect(() => {
    if (player === 'blue' && isIAPlaying) {
      selectColumn(IAPlayer.playColumn(board));
    }
  });

  function setVictory(winnerName: string, positions: number[][]) {
    setWinner(winnerName);
    const boardCopy = _.cloneDeep(board);

    positions.forEach((value) => {
      const [row, column] = value;
      boardCopy[row][column] = 'yellow';
    });
    setBoard(boardCopy);
  }

  function color(id: string): string {
    if (id !== '') {
      return id;
    }
    return 'white';
  }

  function selectColumn(column: number) {
    const row = P4Utils.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    const squaresCopy = [...board];
    squaresCopy[row][column] = player;
    setBoard(squaresCopy);

    const WinPositions = P4Utils.resultForMove(row, column, board);
    if (WinPositions !== null) {
      setVictory(player, WinPositions);
    }

    setNextPlayer();
  }

  function restart() {
    setWinner(null);
    setBoard(P4Utils.newBoard);
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
                    color={color(board[rowIndex][colIndex])}
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
    // const style {
    //   bor
    // }

    return (
      <div style={{ border: 'white', borderWidth: '1px' }}>
        <input
          name="isGoing"
          type="checkbox"
          checked={isIAPlaying}
          onChange={() => setisIAPlaying(!isIAPlaying)}
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
