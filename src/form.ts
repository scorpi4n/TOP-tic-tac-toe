const xRadio = document.getElementById("X");
// const oRadio = document.getElementById('O')
const userNameInput = document.getElementById("name-1");
const checkbox = document.getElementById("ai");
const aiBanter = checkbox.nextElementSibling;
const difficultyDropdown = document.getElementById("difficulty");
const enemyNameLabel = document.querySelector('label[for="name-2"]');
const enemyNameInput = document.getElementById("name-2");
const submitBtn = document.getElementById("submit");

function addEventListeners() {
  checkbox.addEventListener("input", toggleDifficultyInput);
  submitBtn.addEventListener("click", function () {
    p1.setMarker(xRadio.checked);
    p1.setName(userNameInput.value);

    p2.setMarker(!xRadio.checked);
    p2.setName(enemyNameInput.value);

    unrender();
    gameboard.render();
  });
}
addEventListeners();

function removeEventListeners() {
  checkbox.removeEventListener("input", toggleDifficultyInput);
  submitBtn.removeEventListener("click", function () {
    p2.setName(enemyNameInput.value);
  });
}

function toggleDifficultyInput() {
  const difficulty = document.getElementById("difficulty-setting");

  if (checkbox.checked == true) {
    difficulty.style.display = "none";
    aiBanter.style.display = "none";
    enemyNameLabel.style.display = "block";
  } else {
    difficulty.style.display = "block";
    aiBanter.style.display = "inline";
    enemyNameLabel.style.display = "none";
  }
}

function render() {
  addEventListeners();
  const form = document.querySelector("form");
  form.style.display = "flex";
}

function unrender() {
  removeEventListeners();
  const form = document.querySelector("form");
  form.style.display = "none";
}

export { render, unrender };
