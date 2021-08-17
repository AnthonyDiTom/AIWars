import React, { useState } from 'react';
import P4 from '../../classes/P4';
import P4IAPlayer from '../../classes/P4IaPlayer';
import P4Board from './P4Board';
import Winner from './Winner';
import { Positions } from '../../classes/Types';
import { Page } from '../styles/globalStyles';

interface Puissance4PageProps {
  location: {
    state: {
      ia: boolean;
    };
  };
}

const Puissance4Page = ({ location }: Puissance4PageProps) => {
  enum CircleColor {
    playerRed = 'red',
    playerBlue = 'blue',
    victory = 'yellow',
    empty = 'white',
  }

  const { playerRed, playerBlue } = CircleColor;
  const [board, setBoard] = useState(P4.newBoard);
  const [player, setPlayer] = useState(playerRed);
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayingWithAI] = useState(location.state.ia);

  const setNextPlayer = () => setPlayer(player === playerRed ? playerBlue : playerRed);

  React.useEffect(() => {
    if (player === playerBlue && isPlayingWithAI) {
      selectColumn(P4IAPlayer.playColumn(board, playerBlue, playerRed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, isPlayingWithAI]);

  function setVictory(winnerName: string, positions: Positions) {
    setWinner(winnerName);
    positions.forEach((value) => {
      const [row, column] = value;
      board[row][column] = CircleColor.victory;
    });
    setBoard(board);
  }

  function restart() {
    setWinner(null);
    setBoard(P4.newBoard);
    setPlayer(playerRed);
  }

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || winner != null) {
      return;
    }

    board[row][column] = player;
    setBoard(board);

    const winPositions = P4.winningPositionsForLastMove(row, column, board);
    if (winPositions !== null) {
      setVictory(player, winPositions);
    }

    setNextPlayer();
  }

  const winnerName = (): string => {
    switch (isPlayingWithAI) {
      case true:
        return winner === playerBlue ? 'AI' : 'Player';

      default:
        return winner || 'undefined';
    }
  };

  return (
    <Page>
      {winner === null ? (
        `${player.toUpperCase()} plays`
      ) : (
        <Winner name={winnerName().toUpperCase()} onClick={restart} />
      )}
      <P4Board
        board={board}
        borderColor={winner === null ? player : CircleColor.victory}
        selectColumn={selectColumn}
      />
    </Page>
  );
};

export default Puissance4Page;
