import React, { useReducer } from 'react';
import _ from 'lodash';
import '../App.css';
import P4 from '../Classes/P4';
import IAPlayer from '../Classes/IaPlayer';
import CheckBox from '../Components/CheckBox';
import P4Board from '../Components/P4Board';

interface State {
  board: string[][];
  player: string;
  winner: string | null;
  isPlayingWithAI: boolean;
}

type Action =
  | { type: 'restart' }
  | { type: 'play'; row: number; column: number }
  | { type: 'switch-ia-enabled' };

function Puissance4Reducer() {
  enum CircleColor {
    playerRed = 'red',
    playerBlue = 'blue',
    victory = 'yellow',
    empty = 'white',
  }

  const initialSate = (): State => ({
    board: P4.newBoard(),
    player: CircleColor.playerRed,
    winner: null,
    isPlayingWithAI: true,
  });

  const { playerRed, playerBlue } = CircleColor;
  const nextPlayer = (game: State): string => (game.player === playerRed ? playerBlue : playerRed);

  const play = (game: State, row: number, column: number): State => {
    const boardCopy = _.cloneDeep(game.board);
    boardCopy[row][column] = game.player;
    const winPositions = P4.resultForMove(row, column, boardCopy);

    if (winPositions !== null) {
      winPositions.forEach((value) => {
        const [rowIndex, columnIndex] = value;
        boardCopy[rowIndex][columnIndex] = CircleColor.victory;
      });

      return {
        ...game,
        board: boardCopy,
        winner: game.player,
      };
    }

    return {
      ...game,
      board: boardCopy,
      player: nextPlayer(game),
    };
  };

  const reducer = (game: State, action: Action): State => {
    switch (action.type) {
      case 'restart':
        return initialSate();
      case 'play':
        return play(game, action.row, action.column);
      case 'switch-ia-enabled':
        return {
          ...game,
          isPlayingWithAI: !game.isPlayingWithAI,
        };
      default:
        break;
    }
    return game;
  };

  const [state, dispatch] = useReducer(reducer, initialSate());
  // eslint-disable-next-line object-curly-newline
  const { board, isPlayingWithAI, player, winner } = state;

  function restart() {
    dispatch({ type: 'restart' });
  }

  function selectColumn(column: number) {
    const row = P4.availableRowIn(board, column);
    if (row === -1 || state.winner != null) {
      return;
    }

    dispatch({ type: 'play', row, column });
  }

  React.useEffect(() => {
    if (state.player === playerBlue && isPlayingWithAI) {
      selectColumn(IAPlayer.playColumn(board, playerBlue, playerRed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function Winner() {
    return (
      <>
        <div>
          {isPlayingWithAI && winner === playerBlue ? 'AI' : winner} wins !
          <button
            type="button"
            style={{
              marginLeft: '8px',
            }}
            onClick={() => restart()}
          >
            Restart
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      {winner === null ? `${player.toUpperCase()} plays` : <Winner />}
      <P4Board
        board={board}
        borderColor={winner === null ? player : CircleColor.victory}
        selectColumn={selectColumn}
      />
      <CheckBox
        label="Play with AI"
        isChecked={isPlayingWithAI}
        onChange={() => dispatch({ type: 'switch-ia-enabled' })}
      />
    </div>
  );
}

export default Puissance4Reducer;
