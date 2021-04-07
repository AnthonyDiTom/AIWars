import type { Board, Positions } from './Types';

class P4 {
  static columsNumbers = 7;

  static rowsNumber = 6;

  static newBoard = (): Board => {
    const array: Board = [];
    for (let index = 0; index < P4.rowsNumber; index++) {
      array.push(Array(P4.columsNumbers).fill(''));
    }
    return array;
  };

  static availableRowIn(board: Board, column: number): number {
    let lastIndex = -1;
    board.forEach((value, index) => {
      if (value[column] === '') {
        lastIndex = index;
      }
    });
    return lastIndex;
  }

  static availableColomnIn(board: Board): number[] {
    const topRow = board[0];
    const availableRows: number[] = [];
    topRow.forEach((element, index) => {
      if (element === '') {
        availableRows.push(index);
      }
    });

    return availableRows;
  }

  // TODO : duplicate code
  static winningPositionsForMove(row: number, column: number, board: Board): Positions | null {
    let currentPlayer = '';
    let winningPositions: Positions = [];
    let potentialWiningPositions: Positions = [];
    let currentCheckWiningPosition: Positions = [];

    // Horizontal
    for (let colIndex = 0; colIndex < P4.columsNumbers; colIndex++) {
      if (currentPlayer !== board[row][colIndex]) {
        currentPlayer = board[row][colIndex];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([row, colIndex]);

      if (potentialWiningPositions.length > 3 && currentPlayer !== '') {
        currentCheckWiningPosition = [...potentialWiningPositions];
      }
    }
    winningPositions = [...currentCheckWiningPosition];

    // Vertical
    currentPlayer = '';
    potentialWiningPositions = [];
    currentCheckWiningPosition = [];

    for (let rowIndex = 0; rowIndex < P4.rowsNumber; rowIndex++) {
      if (currentPlayer !== board[rowIndex][column]) {
        currentPlayer = board[rowIndex][column];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([rowIndex, column]);

      if (potentialWiningPositions.length > 3 && currentPlayer !== '') {
        currentCheckWiningPosition = [...potentialWiningPositions];
      }
    }
    winningPositions = [...winningPositions, ...currentCheckWiningPosition];

    // Diagonal L to R
    currentPlayer = '';
    potentialWiningPositions = [];
    currentCheckWiningPosition = [];

    let startingColomn = column;
    let startingRow = row;

    while (startingColomn !== 0 && startingRow !== 0) {
      startingRow -= 1;
      startingColomn -= 1;
    }

    for (
      let colIndex = startingColomn, rowIndex = startingRow;
      colIndex < P4.columsNumbers && rowIndex < P4.rowsNumber;
      colIndex++, rowIndex++
    ) {
      if (currentPlayer !== board[rowIndex][colIndex]) {
        currentPlayer = board[rowIndex][colIndex];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([rowIndex, colIndex]);
      if (potentialWiningPositions.length > 3 && currentPlayer !== '') {
        currentCheckWiningPosition = [...potentialWiningPositions];
      }
    }

    winningPositions = [...winningPositions, ...currentCheckWiningPosition];

    // Diagonal R to L
    currentPlayer = '';
    potentialWiningPositions = [];
    currentCheckWiningPosition = [];

    startingColomn = column;
    startingRow = row;
    while (startingColomn < this.columsNumbers && startingRow > 0) {
      startingRow -= 1;
      startingColomn += 1;
    }

    for (
      let colIndex = startingColomn, rowIndex = startingRow;
      colIndex > -1 && rowIndex < this.rowsNumber;
      colIndex--, rowIndex++
    ) {
      if (currentPlayer !== board[rowIndex][colIndex]) {
        currentPlayer = board[rowIndex][colIndex];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([rowIndex, colIndex]);
      if (potentialWiningPositions.length > 3 && currentPlayer !== '') {
        currentCheckWiningPosition = [...potentialWiningPositions];
      }
    }

    winningPositions = [...winningPositions, ...currentCheckWiningPosition];
    return winningPositions.length === 0 ? null : winningPositions;
  }
}

export default P4;
