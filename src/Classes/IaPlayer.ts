import _ from 'lodash';
import P4 from './P4';

class IAPlayer {
  static randomColumn = () => Math.floor(Math.random() * Math.floor(P4.columsNumbers - 1));

  static playColumn(board: string[][], aiPlayer: string, otherPlayer: string): number {
    let column = -1;
    let randomPlay = 0;

    const winingPossibility = IAPlayer.checkAWinningPossibilityFor(aiPlayer, board);

    if (winingPossibility !== null) {
      return winingPossibility;
    }

    const winingPossibilityForOtherPlayer = IAPlayer.checkAWinningPossibilityFor(
      otherPlayer,
      board,
    );

    if (winingPossibilityForOtherPlayer !== null) {
      return winingPossibilityForOtherPlayer;
    }

    if (this.mustControlTheCenter(board)) {
      return 3;
    }

    while (column === -1) {
      randomPlay = IAPlayer.randomColumn();
      column = P4.availableRowIn(board, randomPlay);
    }

    return randomPlay;
  }

  /* control the center */

  static mustControlTheCenter(board: string[][]): boolean {
    return P4.availableRowIn(board, 3) !== -1;
  }

  /*
   to avoid or create ' ', ' ', 'red', 'red' ,'red', ' ' case to win
   */

  // static detectdoubleInHorizontalTactic(board: string[][]): number | null {

  //   return null;
  // }

  static checkAWinningPossibilityFor(player: string, board: string[][]): number | null {
    for (let col = 0; col < P4.columsNumbers; col++) {
      const availableRow = P4.availableRowIn(board, col);

      if (availableRow !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[availableRow][col] = player;
        const winningPositions = P4.resultForMove(availableRow, col, boardCopy);
        if (winningPositions != null) {
          return col;
        }
      }
    }
    return null;
  }
}

export default IAPlayer;
