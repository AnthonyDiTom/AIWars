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

  function setVictory(winnerName: string, positions: number[][]) {
    setWinner(winnerName);
    const squaresCopy = [...squares];

    positions.forEach((value) => {
      const [row, column] = value;
      squaresCopy[row][column] = 'yellow';
    });
    setSquares(squaresCopy);
  }

  function checkVictory(): string | null {
    const wpc = winpositionForColomns();

    if (wpc !== null) {
      setVictory(player, wpc);
    }
    const wpr = winpositionForRows();
    if (wpr !== null) {
      setVictory(player, wpr);
    }

    return null;
  }

  function winpositionForColomns(): number[][] | null {
    let count = 0;
    let currentPlayer = '';

    let rowIndex = 0;
    let columnIndex = 0;

    let winningPositions = [];

    while (columnIndex < columsNumbers) {
      while (rowIndex < rowsNumber) {
        if (currentPlayer !== squares[rowIndex][columnIndex]) {
          currentPlayer = squares[rowIndex][columnIndex];
          winningPositions = [];
          count = 0;
        }
        winningPositions.push([rowIndex, columnIndex]);
        count += 1;

        if (count === 4 && currentPlayer !== '') {
          return winningPositions;
        }
        rowIndex += 1;
      }
      rowIndex = 0;
      count = 0;
      columnIndex += 1;
    }

    return null;
  }

  function winpositionForRows(): number[][] | null {
    let count = 0;
    let currentPlayer = '';

    let rowIndex = 0;
    let columnIndex = 0;

    let winningPositions = [];
    while (rowIndex < rowsNumber) {
      while (columnIndex < columsNumbers) {
        if (currentPlayer !== squares[rowIndex][columnIndex]) {
          currentPlayer = squares[rowIndex][columnIndex];
          winningPositions = [];
          count = 0;
        }
        winningPositions.push([rowIndex, columnIndex]);
        count += 1;

        if (count === 4 && currentPlayer !== '') {
          return winningPositions;
        }
        columnIndex += 1;
      }
      columnIndex = 0;
      count = 0;
      rowIndex += 1;
    }

    return null;
  }

  function color(id: string): string {
    switch (id) {
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      case 'yellow':
        return 'yellow';
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
