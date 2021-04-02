import _ from 'lodash';
import P4 from './P4';
import type { Board } from './Types';

class IAPlayer {
  static randomColumn = () => Math.floor(Math.random() * Math.floor(P4.columsNumbers - 1));

  static playColumn(board: Board, aiPlayer: string, otherPlayer: string): number {
    let column = -1;
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

    if (this.canControlTheCenter(board)) {
      return 3;
    }

    if (this.opponentControlTheCenter(board, aiPlayer, otherPlayer)) {
      return _.shuffle([2, 4])[0];
    }

    const safeMoves = this.safeColomnToPlay(board, otherPlayer);
    // console.log(`safe: ${safeMoves} bad: ${this.badColomnToPlay(board, otherPlayer)}`);
    if (safeMoves.length === 0) {
      // eslint-disable-next-line prefer-destructuring
      column = this.badColomnToPlay(board, otherPlayer)[0];
    } else {
      // eslint-disable-next-line prefer-destructuring
      column = _.shuffle(safeMoves)[0];
    }
    return column;
  }

  /* control the center */

  static canControlTheCenter(board: Board): boolean {
    return board[P4.rowsNumber - 1][3] === '';
  }

  static opponentControlTheCenter(board: Board, ia: string, opponent: string): boolean {
    return board[P4.rowsNumber - 1][3] === opponent && !board[P4.rowsNumber - 1].includes(ia);
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

  /* return colums of other player can't win if ia play it */
  static safeColomnToPlay(board: Board, opponent: string): number[] {
    const safePlayColumn: number[] = [];

    for (let columnIndex = 0; columnIndex < P4.columsNumbers; columnIndex++) {
      const row = P4.availableRowIn(board, columnIndex);
      if (row !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[row][columnIndex] = 'blue';
        if (IAPlayer.checkAWinningPossibilitiesFor(opponent, boardCopy) === null) {
          safePlayColumn.push(columnIndex);
        }
      }
    }
    return safePlayColumn;
  }

  /* return colums of other player can win if ia play it */
  static badColomnToPlay(board: Board, opponent: string): number[] {
    const forbiddenPlay: number[] = [];

    for (let columnIndex = 0; columnIndex < P4.columsNumbers; columnIndex++) {
      const row = P4.availableRowIn(board, columnIndex);
      if (row !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[row][columnIndex] = 'blue';
        if (IAPlayer.checkAWinningPossibilitiesFor(opponent, boardCopy) !== null) {
          forbiddenPlay.push(columnIndex);
        }
      }
    }
    return forbiddenPlay;
  }

  static checkAWinningPossibilitiesFor(player: string, board: Board): number | null {
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
