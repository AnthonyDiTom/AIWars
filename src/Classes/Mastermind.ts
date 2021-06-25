import _ from 'lodash';

export enum MMColor {
  yellow = 'yellow',
  blue = 'blue',
  red = 'red',
  green = 'green',
  white = 'white',
  black = 'black',
}

export enum MMPositionResult {
  good = 0,
  bad = 1,
  absent = 2,
}

class Mastermind {
  static COLORS = [
    MMColor.black,
    MMColor.blue,
    MMColor.yellow,
    MMColor.red,
    MMColor.green,
    MMColor.white,
  ];

  static NUMBEROF_COLOR_TO_FIND = 4;

  colorsToFind: MMColor[];

  playerAttempts: MMColor[][];

  constructor() {
    this.colorsToFind = Mastermind.generateRandomColors();
    this.playerAttempts = [];
  }

  restartGame() {
    this.colorsToFind = Mastermind.generateRandomColors();
    this.playerAttempts = [];
  }

  playerTriesColors(positions: MMColor[]): MMPositionResult[] {
    if (positions.length !== Mastermind.NUMBEROF_COLOR_TO_FIND) {
      throw new Error('unexpected positions size');
    }
    this.playerAttempts.push(positions);
    const positionsResult: MMPositionResult[] = [];
    this.colorsToFind.forEach((value, index) => {
      if (positions[index] === value) {
        positionsResult.push(MMPositionResult.good);
      } else if (positions.includes(value)) {
        positionsResult.push(MMPositionResult.bad);
      } else {
        positionsResult.push(MMPositionResult.absent);
      }
    });
    return Mastermind.sortPositonsResult(positionsResult);
  }

  static sortPositonsResult(positions: MMPositionResult[]): MMPositionResult[] {
    return positions.sort((posA, posb) => (posA > posb ? 1 : -1));
  }

  static generateRandomColors(): MMColor[] {
    const colors: MMColor[] = [];
    for (let index = 0; index < Mastermind.NUMBEROF_COLOR_TO_FIND; index++) {
      colors.push(_.shuffle(Mastermind.COLORS)[0]);
    }
    return colors;
  }
}

export default Mastermind;
