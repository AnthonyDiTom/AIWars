import React, { useState } from 'react';
import './App.css';
import P4Utils from './Classes/P4Utils';

function Board() {
  const [board, setBoard] = useState(P4Utils.newBoard);
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState<string | null>(null);

  const setNextPlayer = () => setPlayer(player === 'red' ? 'blue' : 'red');

  function setVictory(winnerName: string, positions: number[][]) {
    setWinner(winnerName);
    const squaresCopy = [...board];

    positions.forEach((value) => {
      const [row, column] = value;
      squaresCopy[row][column] = 'yellow';
    });
    setBoard(squaresCopy);
  }

  function color(id: string): string {
    if (id !== '') {
      return id;
    }
    return 'white';
  }

  function renderSquare(row: number, column: number) {
    return (
      <div
        tabIndex={0}
        key={`${row}${column}`}
        style={{ backgroundColor: color(board[row][column]) }}
        role="button"
        className="square"
        onClick={() => selectColumn(column)}
        onKeyPress={() => selectColumn(column)}
      >
        {}
      </div>
    );
  }

  function renderRow(row: Array<string>, rowIndex: number) {
    return (
      <div className="board-row" key={`${rowIndex}`}>
        {row.map((value, index) => {
          return renderSquare(rowIndex, index);
        })}
      </div>
    );
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

  function WinnerComponent() {
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

  return (
    <div>
      {winner === null ? <h3>{player}</h3> : <WinnerComponent />}

      {board.map((value, index) => {
        return renderRow(value, index);
      })}
    </div>
  );
}

export default Board;
