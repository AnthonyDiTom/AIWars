import P4Utils from '../Classes/P4Utils';

class IAPlayer {
  color: string;

  name = 'IA';

  constructor(color: string) {
    this.color = color;
  }

  static getRandomInt(): number {
    return Math.floor(Math.random() * Math.floor(6));
  }

  static play(board: string[][]): number {
    let column = -1;
    let randomPlay = 0;
    while (column === -1) {
      randomPlay = IAPlayer.getRandomInt();
      column = P4Utils.availableRowIn(board, randomPlay);
    }
    console.log(`ia play ${column}`);
    return randomPlay;
  }
}

export default IAPlayer;
