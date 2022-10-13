const form = (function() {
	let checkbox = document.getElementById('ai')
	checkbox.addEventListener('input', toggleDifficultyInput)
	let aiBanter = checkbox.nextElementSibling
	let enemyNameInput = document.querySelector('label[for="name-2"]')
	// let submitBtn = docuent.getElementById('submit')

	function toggleDifficultyInput() {
		let difficulty = document.getElementById('difficulty-setting')
		
		if (checkbox.checked == true) {
			difficulty.style.display = 'none'
			aiBanter.style.display = 'none'
			enemyNameInput.style.display = 'block'
		} else {
			difficulty.style.display = 'block'
			aiBanter.style.display = 'inline'
			enemyNameInput.style.display = 'none'
		}
	}
})()

const gameboard = (function() {
	let board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	let HTMLgameboard = document.querySelector('.gameboard')

	function render() {
		for (i of board) {
			let div = document.createElement('div')
			div.classList.add('cell')
			div.setAttribute('data-index', board.indexOf(i))
			HTMLgameboard.appendChild(div)
		}
	}

	function pickCell(index) {
		let cells = document.querySelectorAll('.cell')
		for (i of cells) {
			if (i.dataset.index == index) {
				div = i
			}
		}
	}

	function placeMarker(marker, index) {
		pickCell(index)

		if (typeof board[index] == typeof '') {
			console.error('Somebody has already gone there.')
		} else {
			div.classList.add(`active-${marker}`)
			board.splice(index, 1, marker)
		}
	}

	function checkForWin() {
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
			[2, 4, 6]
		]

		for (state of winStates) {
			if (board[state[0]] == board[state[1]] && board[state[1]] == board[state[2]]) {
				console.log(`${board[state[0]]} wins`)
				break
			}
		}
	}
	
	return {
		render,
		placeMarker,
		checkForWin,
		// createPlayers
	}
})()

function playerFactory() {
	let name
	let marker

	function setName(newName) {
		name = newName
	}

	function getName() {
		return name
	}

	function setMarker(newMarker) {
		marker = newMarker
	}

	function getMarker() {
		return marker
	}

	function playTurn(index) {
		gameboard.placeMarker(getMarker(), index)
		gameboard.checkForWin()
	}

	return {
		setName,
		getName,
		setMarker,
		getMarker,
		playTurn
	}
}



const p1 = playerFactory()
p1.setMarker('x')
const p2 = playerFactory()
p2.setMarker('o')