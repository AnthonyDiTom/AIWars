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

    // Horizontal
    for (let colIndex = 0; colIndex < P4Utils.columsNumbers; colIndex++) {
      if (currentPlayer !== board[row][colIndex]) {
        currentPlayer = board[row][colIndex];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([row, colIndex]);

      if (potentialWiningPositions.length === 4 && currentPlayer !== '') {
        winningPositions = [...potentialWiningPositions];
      }
    }

    // Vertical
    currentPlayer = '';
    potentialWiningPositions = [];

    for (let rowIndex = 0; rowIndex < P4Utils.rowsNumber; rowIndex++) {
      if (currentPlayer !== board[rowIndex][column]) {
        currentPlayer = board[rowIndex][column];
        potentialWiningPositions = [];
      }
      potentialWiningPositions.push([rowIndex, column]);

      if (potentialWiningPositions.length === 4 && currentPlayer !== '') {
        winningPositions = [...winningPositions, ...potentialWiningPositions];
      }
    }
    console.log(winningPositions);

    currentPlayer = '';
    potentialWiningPositions = [];

    return winningPositions.length === 0 ? null : winningPositions;
  }
}

export default P4Utils;
