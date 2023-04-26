import { Game } from "./game";

export function evaluateGame(game: Game): -1 | 0 | 1 {
  const winner = game.winner;

  if (winner === game.p2) {
    return 1;
  } else if (winner === game.p1) {
    return -1;
  }

  return 0;
}

export function getMoves(game: Game): number[] {
  const moves: number[] = [];

  if (game.isTerminal()) return moves;

  game.board.forEach((space, i) => {
    if (space === null) {
      moves.push(i);
    }
  });

  return moves;
}

export function getNextBoard(game: Game, index: number) {
  const nextPlayer = game.currentPlayer;
  const nextBoard = [...game.board];
  nextBoard[index] = nextPlayer.marker;

  return nextBoard;
}
