import _ from 'lodash';
import P4 from './P4';

class IAPlayer {
  static randomColumn = () => Math.floor(Math.random() * Math.floor(P4.columsNumbers - 1));

  static playColumn(board: string[][], aiPlayer: string, otherPlayer: string): number {
    let column = -1;
    let randomPlay = 0;

    const winingPossibilities = IAPlayer.checkAWinningPossibilitiesFor(aiPlayer, board);

    if (winingPossibilities !== null) {
      return winingPossibilities;
    }

    const winingPossibilitiesForOtherPlayer = IAPlayer.checkAWinningPossibilitiesFor(
      otherPlayer,
      board,
    );

    if (winingPossibilitiesForOtherPlayer !== null) {
      return winingPossibilitiesForOtherPlayer;
    }

    // if (this.mustControlTheCenter(board)) {
    //   return 3;
    // }

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
   | |X|X| | | | |
   | | |X|X| | | |
   | | | |X|X| | |
   | | | | |X|X| |
   */

  // static playerCanPlayDoubleInHorizontalTactic(board: string[][], player: String): number | null{
  //   return null;
  // }

  static forbiddenColomnToPlay(board: string[][], opponent: string): number[] {
    let forbiddenPlay: number[] = [];

    for (let columnIndex = 0; columnIndex < P4.columsNumbers; columnIndex++) {
      const row = P4.availableRowIn(board, columnIndex);
      if (row !== -1) {
        let boardCopy = _.cloneDeep(board);
        boardCopy[row][columnIndex] = 'blue';
        if (IAPlayer.checkAWinningPossibilitiesFor(opponent, boardCopy) !== null) {
          forbiddenPlay.push(columnIndex);
        }
      }
    }
    return forbiddenPlay;
  }

  static checkAWinningPossibilitiesFor(player: string, board: string[][]): number | null {
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
