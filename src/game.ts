import * as dom from "./dom.js";

class Player {
  name;
  marker;

  constructor(name, marker) {
    this.name = name
    this.marker = marker
  }

  playTurn(index) {
    gameboard.placeMarker(getMarker(), index);
    isTerminal(gameboard.board);
  }
}

export class Game {


  constructor() { }
}


let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentPlayer = p1;

function togglePlayer() {
  currentPlayer == p1 ? (currentPlayer = p2) : (currentPlayer = p1);
}

function placeMarker(marker, index) {
  let cells = document.querySelectorAll(".cell");
  for (i of cells) {
    if (i.dataset.index == index) {
      div = i;
    }
  }

  if (typeof board[index] == typeof "") {
    console.error("Somebody has already gone there.");
  } else {
    div.classList.add(`active-${marker}`);
    div.innerText = `${marker}`;
    board.splice(index, 1, marker);
  }
}

function render() {
  dom.gameboard.style.display = "grid";
  for (i of board) {
    let div = document.createElement("div");
    div.classList.add("cell", "window", "flex");
    div.setAttribute("data-index", board.indexOf(i));
    div.addEventListener("click", function () {
      currentPlayer.playTurn(div.dataset.index);
      togglePlayer();
    });
    dom.gameboard.appendChild(div);
  }
}

function unrender() {
  while (dom.gameboard.lastChild) {
    dom.gameboard.removeChild(dom.gameboard.lastChild);
  }
  dom.gameboard.style.display = "none";
}

function getCurrentPlayer() {
  return currentPlayer;
}

function isTerminal(gameState) {
  // 0, 1, 2,
  // 3, 4, 5,
  // 6, 7, 8
  let winStates = [
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

  for (state of winStates) {
    if (
      gameState[state[0]] == gameState[state[1]] &&
      gameState[state[1]] == gameState[state[2]]
    ) {
      console.log(`${gameState[state[1]]} wins`);
      return gameState[state[1]] == "o" ? -1 : 1;
    }
  }
  return 0;
}