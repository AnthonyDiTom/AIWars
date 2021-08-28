/* eslint-disable no-console */
import _ from 'lodash';
import P4 from './P4';
import type { Board } from './Types';

class P4AnthoPlayer {
  ai: string;
  opponent: string;

  constructor(ai: string, opponent: string) {
    this.ai = ai;
    this.opponent = opponent;
  }

  randomColumn = () => Math.floor(Math.random() * Math.floor(P4.columsNumbers - 1));

  getColomnToPlay(board: Board): number {
    let column = -1;

    const winingPossibilityForAi = P4AnthoPlayer.checkAWinningPossibilityFor(this.ai, board);

    const winingPossibilityForOpponent = P4AnthoPlayer.checkAWinningPossibilityFor(
      this.opponent,
      board,
    );

    const losePossibilities = this.badColomnToPlay(board);
    const safeMoves = this.safeColomnsToPlay(board);

    console.log(
      `safe: ${safeMoves} bad: ${losePossibilities} opponent can win: ${winingPossibilityForOpponent}`,
    );

    if (winingPossibilityForAi !== null) {
      console.log(`I play to win! col ${winingPossibilityForAi}`);
      return winingPossibilityForAi;
    }

    if (winingPossibilityForOpponent !== null) {
      console.log(`I prevent wining possibility for oponent col ${winingPossibilityForOpponent}`);
      return winingPossibilityForOpponent;
    }

    if (this.canControlTheCenter(board)) {
      console.log('I control the center');
      return 3;
    }

    if (this.opponentControlTheCenter(board)) {
      console.log('I prevent _ _ x x x _ _ winning case');
      return _.shuffle([2, 4])[0];
    }

    if (safeMoves.length === 0) {
      console.log('I m foutu');
      [column] = losePossibilities;
    } else {
      [column] = _.shuffle(safeMoves);
      console.log(`I m playing safe move col ${column}`);
    }
    return column;
  }

  /* control the center */

  canControlTheCenter = (board: Board) => board[P4.rowsNumber - 1][3] === '';

  opponentControlTheCenter(board: Board): boolean {
    return (
      board[P4.rowsNumber - 1][3] === this.opponent && !board[P4.rowsNumber - 1].includes(this.ai)
    );
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
  safeColomnsToPlay(board: Board): number[] {
    const safePlayColumn: number[] = [];

    for (let columnIndex = 0; columnIndex < P4.columsNumbers; columnIndex++) {
      const row = P4.availableRowIn(board, columnIndex);
      if (row !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[row][columnIndex] = this.ai;
        if (P4AnthoPlayer.checkAWinningPossibilityFor(this.opponent, boardCopy) === null) {
          safePlayColumn.push(columnIndex);
        }
      }
    }
    return safePlayColumn;
  }

  /* return colums of other player can win if ia play it */
  badColomnToPlay(board: Board): number[] {
    const forbiddenPlay: number[] = [];

    for (let columnIndex = 0; columnIndex < P4.columsNumbers; columnIndex++) {
      const row = P4.availableRowIn(board, columnIndex);
      if (row !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[row][columnIndex] = this.ai;
        if (P4AnthoPlayer.checkAWinningPossibilityFor(this.opponent, boardCopy) !== null) {
          forbiddenPlay.push(columnIndex);
        }
      }
    }
    return forbiddenPlay;
  }

  static checkAWinningPossibilityFor(player: string, board: Board): number | null {
    for (let col = 0; col < P4.columsNumbers; col++) {
      const availableRow = P4.availableRowIn(board, col);

      if (availableRow !== -1) {
        const boardCopy = _.cloneDeep(board);
        boardCopy[availableRow][col] = player;
        const winningPositions = P4.winningPositionsForLastMove(availableRow, col, boardCopy);
        if (winningPositions != null) {
          return col;
        }
      }
    }
    return null;
  }
}

export default P4AnthoPlayer;
