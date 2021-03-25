import React, { useState } from 'react';
import './App.css';

function Board() {
  const [squares, setSquares] = useState(() => [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ]);

  const [player, setPlayer] = useState('red');

  function setNextPlayer() {
    setPlayer(player === 'red' ? 'blue' : 'red');
  }

  function color(id: string): string {
    switch (id) {
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      default:
        return 'white';
    }
  }

  function renderSquare(row: number, column: number) {
    const styles = {
      backgroundColor: color(squares[row][column]),
    };

    return (
      <button
        key={`${row}${column}`}
        style={styles}
        type="button"
        className="square"
        onClick={() => selectColumn(column)}
      >
        {}
      </button>
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
    const row = availableRowIn(column);
    if (row === -1) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[row][column] = player;
    setSquares(squaresCopy);
    setNextPlayer();
  }

  function availableRowIn(column: number): number {
    let lastIndex = -1;
    squares.forEach((value, index) => {
      if (value[column] === '') {
        lastIndex = index;
      }
    });
    return lastIndex;
  }

  return (
    <div>
      <h6>player: {player}</h6>
      {squares.map((value, index) => {
        return renderRow(value, index);
      })}
    </div>
  );
}

export default Board;
