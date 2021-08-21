/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import P4 from '../../classes/P4';
import P4IAPlayer from '../../classes/P4IaPlayer';
import P4Board from './P4Board';
import { Positions } from '../../classes/Types';
import { Page } from '../styles/globalStyles';
import { Game } from '../../classes/P4Game';
import Button from '../styles/Button';

enum CircleColor {
  playerRed = 'red',
  playerBlue = 'blue',
  victory = 'yellow',
  empty = 'white',
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

  const newGame = (): Game => {
    const g = {
      board: P4.newBoard(),
      player1: {
        color: playerRed,
        name: 'Rouge',
        victory: 0,
        isIA: false,
      },
      player2: {
        color: playerBlue,
        name: isPlayingWithAI ? 'IA' : 'Bleu',
        victory: 0,
        isIA: isPlayingWithAI,
      },
    };
    return g;
  };

  const [game, setGame] = useState(newGame());
  const { player1, player2, board } = game;
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
    setGame(game);
  }

  function restart() {
    setWinner(null);
    setGame({
      ...game,
      board: P4.newBoard(),
    });
    setCurrentPlayer(player1);
  }

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    board[row][column] = currentPlayer.color;
    setGame(game);

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
        `${currentPlayer.name} joue`
      ) : (
        <span style={{ marginRight: '16px' }}>{currentPlayer.name} gagne !</span>
      )}
      <P4Board
        board={board}
        borderColor={winner === null ? currentPlayer.color : CircleColor.victory}
        selectColumn={selectColumn}
      />
      <span>{`${player1.name} ${player1.victory} - ${player2.victory} ${player2.name}`}</span>
      {winner && (
        <Button style={{ marginTop: '16px' }} onClick={restart}>
          Restart
        </Button>
      )}
    </Page>
  );
};

export default Puissance4Page;
