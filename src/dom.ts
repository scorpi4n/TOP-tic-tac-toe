export const gameboard = document.querySelector(".gameboard") as HTMLElement;
export const scoreboard = document.getElementById("scoreboard") as HTMLElement;

// form
export const form = document.querySelector("form") as HTMLFormElement;
export const xRadio = document.getElementById("X") as HTMLFormElement;
// export const oRadio = document.getElementById('O' )
export const userNameInput = document.getElementById(
  "name-1"
) as HTMLFormElement;
export const checkbox = document.getElementById("ai") as HTMLFormElement;
export const aiBanter = checkbox?.nextElementSibling as HTMLFormElement;
export const difficultyDropdown = document.getElementById(
  "difficulty"
) as HTMLFormElement;
export const enemyNameLabel = document.querySelector(
  'label[for="name-2"]'
) as HTMLFormElement;
export const enemyNameInput = document.getElementById(
  "name-2"
) as HTMLFormElement;
export const difficulty = document.getElementById(
  "difficulty-setting"
) as HTMLFormElement;
export const submitBtn = document.getElementById("submit") as HTMLFormElement;
