/* eslint-disable no-plusplus */
class P4Utils {
  static columsNumbers = 7;

  static rowsNumber = 6;

  static newBoard = (): string[][] => {
    return [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
  };

  static availableRowIn(board: string[][], column: number): number {
    let lastIndex = -1;
    board.forEach((value, index) => {
      if (value[column] === '') {
        lastIndex = index;
      }
    });
    return lastIndex;
  }

  static resultForMove(
    row: number,
    column: number,
    board: string[][],
  ): number[][] | null {
    let currentPlayer = '';
    let winningPositions: number[][] = [];
    let potentialWiningPositions: number[][] = [];
    let currentCheckWiningPosition: number[][] = [];

    // Horizontal
    for (let colIndex = 0; colIndex < P4Utils.columsNumbers; colIndex++) {
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

    for (let rowIndex = 0; rowIndex < P4Utils.rowsNumber; rowIndex++) {
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
      colIndex < P4Utils.columsNumbers && rowIndex < P4Utils.rowsNumber;
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

export default P4Utils;
