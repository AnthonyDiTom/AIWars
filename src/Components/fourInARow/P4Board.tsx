import React from 'react';
import CircleButton from './CircleButton';
import type { Board } from '../../classes/Types';

type P4BoardProps = {
  board: Board;
  borderColor: string;
  selectColumn: (column: number) => void;
};

function P4Board({ board, borderColor, selectColumn }: P4BoardProps) {
  const caseColor = (id: string): string => (id === '' ? 'white' : id);

  return (
    <div className="p4Board" style={{ borderColor }}>
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

export default P4Board;
