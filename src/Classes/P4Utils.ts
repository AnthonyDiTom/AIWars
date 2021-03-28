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

    // Diagonal
    currentPlayer = '';
    potentialWiningPositions = [];
    currentCheckWiningPosition = [];

    winningPositions = [...winningPositions, ...currentCheckWiningPosition];

    currentPlayer = '';
    potentialWiningPositions = [];

    return winningPositions.length === 0 ? null : winningPositions;
  }
}

export default P4Utils;
