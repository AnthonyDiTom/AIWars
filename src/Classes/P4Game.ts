import { Board } from './Types';

export interface Player {
  color: string;
  name: string;
  victory: number;
  isIA: boolean;
}

export interface Game {
  board: Board;
  player1: Player;
  player2: Player;
}
