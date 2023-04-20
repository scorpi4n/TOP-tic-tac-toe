import * as dom from "./dom";
import { Game, Player } from "./game";

export default {
  handleSubmit,
  toggleDifficultyInput,
  addEventListeners,
  removeEventListeners,
  render,
  unrender,
};

function handleSubmit() {
  const isX = dom.xRadio?.checked;
  const game = new Game(
    new Player(dom.userNameInput?.value, isX ? "x" : "o"),
    new Player(dom.enemyNameInput?.value, isX ? "o" : "x")
  );
  unrender();
  game.render();
}

function toggleDifficultyInput() {
  if (dom.checkbox?.checked == true) {
    dom.difficulty.style.display = "none";
    dom.aiBanter.style.display = "none";
    dom.enemyNameLabel.style.display = "block";
  } else {
    dom.difficulty.style.display = "block";
    dom.aiBanter.style.display = "inline";
    dom.enemyNameLabel.style.display = "none";
  }
}

function addEventListeners() {
  dom.checkbox?.addEventListener("input", toggleDifficultyInput);
  dom.submitBtn?.addEventListener("click", handleSubmit);
}

function removeEventListeners() {
  dom.checkbox?.removeEventListener("input", toggleDifficultyInput);
  dom.submitBtn?.removeEventListener("click", handleSubmit);
}

function render() {
  addEventListeners();
  dom.form.style.display = "flex";
}

function unrender() {
  removeEventListeners();
  dom.form.style.display = "none";
}
