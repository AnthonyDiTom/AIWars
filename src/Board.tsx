import React, { useState } from 'react';
import './App.css';
import P4Utils from './Classes/P4Utils';

function Board() {
  const [squares, setSquares] = useState(P4Utils.board());

  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState<string | null>(null);

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

  function checkVictory() {
    const wpc = P4Utils.winpositionForColomns(squares);
    if (wpc !== null) {
      setVictory(player, wpc);
    }

    const wpr = P4Utils.winpositionForRows(squares);
    if (wpr !== null) {
      setVictory(player, wpr);
    }

    const wpo = P4Utils.winpositionForDiagonals(squares);
    if (wpo !== null) {
      setVictory(player, wpo);
    }
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
      <div
        tabIndex={0}
        key={`${row}${column}`}
        style={styles}
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

  function restart() {
    setWinner(null);
    setSquares(P4Utils.board());
  }

  function WinnerComponent() {
    return (
      <>
        <h6>
          {winner} is the winner !{'  '}
          <button type="button" onClick={() => restart()}>
            Restart
          </button>
        </h6>
      </>
    );
  }

  return (
    <div>
      {winner === null ? <h6>player: {player}</h6> : <WinnerComponent />}

      {squares.map((value, index) => {
        return renderRow(value, index);
      })}
    </div>
  );
}

export default Board;
