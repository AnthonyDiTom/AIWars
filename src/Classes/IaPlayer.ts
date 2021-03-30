import P4Utils from './P4Utils';

class IAPlayer {
  static getRandomInt(): number {
    return Math.floor(Math.random() * Math.floor(6));
  }

  static playColumn(board: string[][]): number {
    let column = -1;
    let randomPlay = 0;

    const winingPossibility = IAPlayer.checkAWinningPossibilityForIa(board);
    if (winingPossibility !== null) {
      return winingPossibility;
    }

    while (column === -1) {
      randomPlay = IAPlayer.getRandomInt();
      column = P4Utils.availableRowIn(board, randomPlay);
    }

    return randomPlay;
  }

  static checkAWinningPossibilityForIa(board: string[][]): number | null {
    for (let col = 0; col < P4Utils.columsNumbers; col++) {
      const availableRow = P4Utils.availableRowIn(board, col);

      if (availableRow !== -1) {
        const boardCopy = [...board];
        boardCopy[availableRow][col] = 'blue';
        const winningPositions = P4Utils.resultForMove(
          availableRow,
          col,
          boardCopy,
        );
        if (winningPositions != null) {
          return col;
        }
      }
    }

    return null;
  }
}

export default IAPlayer;
