import React, { useState } from 'react';
import P4 from '../../classes/P4';
import P4IAPlayer from '../../classes/P4IaPlayer';
import P4Board from './P4Board';
import Winner from './Winner';
import { Positions } from '../../classes/Types';
import { Page } from '../styles/globalStyles';

enum CircleColor {
  playerRed = 'red',
  playerBlue = 'blue',
  victory = 'yellow',
  empty = 'white',
}

interface Player {
  color: string;
  name: string;
  victory: number;
  isIA: boolean;
}

interface Puissance4PageProps {
  location: {
    state: {
      ia: boolean;
    };
  };
}

const Puissance4Page = ({ location }: Puissance4PageProps) => {
  const { playerRed, playerBlue } = CircleColor;
  const isPlayingWithAI = location.state.ia;

  const player1: Player = {
    color: playerRed,
    name: 'Joueur rouge',
    victory: 0,
    isIA: false,
  };

  const player2: Player = {
    color: playerBlue,
    name: isPlayingWithAI ? 'IA' : 'Joueur bleu',
    victory: 0,
    isIA: isPlayingWithAI,
  };

  const [board, setBoard] = useState(P4.newBoard);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [winner, setWinner] = useState<string | null>(null);

  const setNextPlayer = () => {
    const isPlayer1Playing = currentPlayer.color === player1.color;
    setCurrentPlayer(isPlayer1Playing ? player2 : player1);
  };

  React.useEffect(() => {
    if (currentPlayer.isIA) {
      setTimeout(() => {
        selectColumn(P4IAPlayer.playColumn(board, player1.color, player2.color));
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  function setVictory(positions: Positions) {
    currentPlayer.victory += 1;
    positions.forEach((value) => {
      const [row, column] = value;
      board[row][column] = CircleColor.victory;
    });
    setWinner(currentPlayer.name);
    setBoard(board);
  }

  function restart() {
    setWinner(null);
    setBoard(P4.newBoard);
    setCurrentPlayer(player1);
  }

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    board[row][column] = currentPlayer.color;
    setBoard(board);

    const winPositions = P4.winningPositionsForLastMove(row, column, board);
    if (winPositions !== null) {
      setVictory(winPositions);
    } else {
      setNextPlayer();
    }
  }

  return (
    <Page>
      {winner === null ? (
        `${currentPlayer.victory} - ${currentPlayer.name} joue`
      ) : (
        <Winner name={currentPlayer.name} onClick={restart} />
      )}
      <P4Board
        board={board}
        borderColor={winner === null ? currentPlayer.color : CircleColor.victory}
        selectColumn={selectColumn}
      />
    </Page>
  );
};

export default Puissance4Page;
