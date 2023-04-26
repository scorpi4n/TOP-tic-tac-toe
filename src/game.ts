import * as dom from "./dom";
import { evaluateGame, getMoves } from "./minimax";

export class Player {
  name: string;
  private _marker: string;
  private _wins: number;

  constructor(name: string, marker: string) {
    this.name = name;
    this._marker = marker.toLowerCase();
    this._wins = 0;
  }

  get marker() {
    return this._marker;
  }

  get wins() {
    return this._wins;
  }

  incrementWins() {
    this._wins++;
  }
}

export class Game {
  p1: Player;
  p2: Player;
  private _currentPlayer: Player;
  private _board: (string | null)[];

  constructor(p1: Player, p2: Player) {
    this.p1 = p1;
    this.p2 = p2;
    this._currentPlayer = p1.marker === "x" ? p1 : p2;
    this._board = new Array(9).fill(null);
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get board() {
    return this._board;
  }

  togglePlayer() {
    this._currentPlayer == this.p1
      ? (this._currentPlayer = this.p2)
      : (this._currentPlayer = this.p1);
  }

  placeMarker(index: number) {
    this.board[index] === null
      ? (this.board[index] = this._currentPlayer.marker)
      : console.log("Spot taken");

    this.togglePlayer();
  }

  get winner(): Player | null {
    // 0, 1, 2,
    // 3, 4, 5,
    // 6, 7, 8

    const terminalIndices = [
      // horizontal wins
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical wins
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal wins
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const index of terminalIndices) {
      if (
        this.board[index[0]] === this.board[index[1]] &&
        this.board[index[1]] === this.board[index[2]] &&
        this.board[index[1]] !== null
      ) {
        const winner =
          this.p1.marker === this.board[index[1]] ? this.p1 : this.p2;
        return winner;
      }
    }

    return null;
  }

  isTerminal(): boolean {
    if (this.winner !== null) return true;

    const isFull = !this.board.includes(null);
    if (isFull) {
      return true;
    }

    return false;
  }

  handleClick(e) {
    if (!e.target.dataset.index) return;
    const { index } = e.target.dataset;
    if (this.board[parseInt(index)] !== null) return;
    e.target.classList.add(`active-${this.currentPlayer.marker}`);
    e.target.innerText = this.currentPlayer.marker;
    this.placeMarker(parseInt(index));

    // i think this is where the minimax check and call will go

    if (this.p2.name === "simba" && this.currentPlayer === this.p2) {
      console.log(this.minimax(true));
    }

    if (this.winner !== null) {
      this.winner.incrementWins();
      this.refreshScoreboard();
      const cells = [...dom.gameboard.childNodes];
      cells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
    }
  }

  render() {
    dom.gameboard.style.display = "grid";
    this.board.forEach((_, i) => {
      const div = document.createElement("div");
      div.classList.add("cell", "window", "flex");
      div.setAttribute("data-index", `${i}`);
      div.addEventListener("click", this.handleClick.bind(this));
      dom.gameboard.appendChild(div);
    });
    this.renderScoreboard();
  }

  unrender() {
    while (dom.gameboard.lastChild) {
      dom.gameboard.removeChild(dom.gameboard.lastChild);
    }
    dom.gameboard.style.display = "none";
  }

  refreshScoreboard() {
    dom.scoreboard.innerText = `${this.p1.name} has won ${this.p1.wins} times. ${this.p2.name} has won ${this.p2.wins} times`;
  }

  renderScoreboard() {
    this.refreshScoreboard();
    dom.scoreboard.style.display = "block";
  }

  minimax(isMaximizing: boolean): number {
    if (this.isTerminal()) return evaluateGame(this);

    let value: number;

    switch (isMaximizing) {
      case true: {
        value = -Infinity;
        for (const move of getMoves(this)) {
          this.placeMarker(move);
          value = Math.max(value, this.minimax(false));
          this.board[move] = null;
          this.togglePlayer();
        }
        return value;
      }
      case false: {
        value = Infinity;
        for (const move of getMoves(this)) {
          this.placeMarker(move);
          value = Math.min(value, this.minimax(true));
          this.board[move] = null;
          this.togglePlayer();
        }
        return value;
      }
    }
  }
}
