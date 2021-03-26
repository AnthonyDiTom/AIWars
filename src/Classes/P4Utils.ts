class P4Utils {
  static columsNumbers = 7;

  static rowsNumber = 6;

  static board(): string[][] {
    return [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ];
  }

  static winpositionForColomns(board: string[][]): number[][] | null {
    let count = 0;
    let currentPlayer = '';

    let rowIndex = 0;
    let columnIndex = 0;

    let winningPositions = [];

    while (columnIndex < P4Utils.columsNumbers) {
      while (rowIndex < P4Utils.rowsNumber) {
        if (currentPlayer !== board[rowIndex][columnIndex]) {
          currentPlayer = board[rowIndex][columnIndex];
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

  static winpositionForDiagonals(board: string[][]): number[][] | null {
    // let count = 0;
    // let currentPlayer = '';

    // let rowIndex = 0;
    // let columnIndex = 0;

    // let winningPositions = [];
    return null;
  }

  static winpositionForRows(board: string[][]): number[][] | null {
    let count = 0;
    let currentPlayer = '';

    let rowIndex = 0;
    let columnIndex = 0;

    let winningPositions = [];

    while (rowIndex < P4Utils.rowsNumber) {
      while (columnIndex < P4Utils.columsNumbers) {
        if (currentPlayer !== board[rowIndex][columnIndex]) {
          currentPlayer = board[rowIndex][columnIndex];
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
}

export default P4Utils;
