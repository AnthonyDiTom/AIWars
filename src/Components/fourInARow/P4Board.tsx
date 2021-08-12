import React from 'react';
import CircleButton from '../styles/CircleButton';
import { Board } from '../../classes/Types';
import BorderBox from '../styles/BorderBox';

type P4BoardProps = {
  board: Board;
  borderColor: string;
  selectColumn: (column: number) => void;
};

function P4Board({ board, borderColor, selectColumn }: P4BoardProps) {
  const caseColor = (id: string): string => (id === '' ? 'white' : id);

  return (
    <BorderBox borderColor={borderColor}>
      {board.map((row, rowIndex) => {
        const rowKey = `RI${rowIndex}`;
        return (
          <div key={`${rowKey}`}>
            {row.map((value, colIndex) => {
              const key = `R${rowIndex}C${colIndex}`;
              return (
                <CircleButton
                  key={key}
                  color={caseColor(board[rowIndex][colIndex])}
                  onClick={() => selectColumn(colIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </BorderBox>
  );
}

export default P4Board;
