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
  const [winner, setWinner] = useState<string | null>(null);

  const columsNumbers = 7;
  const rowsNumber = 6;

  function setNextPlayer() {
    setPlayer(player === 'red' ? 'blue' : 'red');
  }

  function checkVictory(): string | null {
    const wfc = winnerForColomns();
    if (wfc !== null) {
      setWinner(wfc);
      return wfc;
    }
    const wfr = winnerForRows();
    if (wfr !== null) {
      setWinner(wfr);
      return wfr;
    }

    return null;
  }

  function winnerForColomns(): string | null {
    let count = 0;
    let currentPlayer = '';

    let rowIndex = 0;
    let columnIndex = 0;

    while (columnIndex < columsNumbers) {
      while (rowIndex < rowsNumber) {
        if (currentPlayer !== squares[rowIndex][columnIndex]) {
          currentPlayer = squares[rowIndex][columnIndex];
          count = 0;
        }

        count += 1;

        if (count === 4 && currentPlayer !== '') {
          return currentPlayer;
        }
        rowIndex += 1;
      }
      rowIndex = 0;
      count = 0;
      columnIndex += 1;
    }

    return null;
  }

  function winnerForRows(): string | null {
    let count = 0;
    let currentPlayer = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const row of squares) {
      // eslint-disable-next-line no-restricted-syntax
      for (const value of row) {
        if (currentPlayer !== value) {
          currentPlayer = value;
          count = 0;
        }
        currentPlayer = value;
        count += 1;
        if (count === 4 && value !== '') {
          return value;
        }
      }
      count = 0;
    }
    return null;
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
    checkVictory();
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
      {winner === null ? (
        <h6>player: {player}</h6>
      ) : (
        <h6>{winner} is the winner !</h6>
      )}

      {squares.map((value, index) => {
        return renderRow(value, index);
      })}
    </div>
  );
}

export default Board;
