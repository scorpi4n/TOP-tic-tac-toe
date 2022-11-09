const p1 = playerFactory()
const p2 = playerFactory()

const form = (function() {
	const xRadio = document.getElementById('X')
	// const oRadio = document.getElementById('O')
	const userNameInput = document.getElementById('name-1')
	const checkbox = document.getElementById('ai')
	const aiBanter = checkbox.nextElementSibling
	const difficultyDropdown = document.getElementById('difficulty')
	const enemyNameLabel = document.querySelector('label[for="name-2"]')
	const enemyNameInput = document.getElementById('name-2')
	const submitBtn = document.getElementById('submit')
	
	function addEventListeners() {
		checkbox.addEventListener('input', toggleDifficultyInput)
		submitBtn.addEventListener('click', function() {
			p1.setMarker(xRadio.checked)
			p1.setName(userNameInput.value)

			p2.setMarker(!xRadio.checked)
			p2.setName(enemyNameInput.value)

			unrender()
			gameboard.render()
		})
	}
	addEventListeners()
	
	function removeEventListeners() {
		checkbox.removeEventListener('input', toggleDifficultyInput)
		submitBtn.removeEventListener('click', function() {
			p2.setName(enemyNameInput.value)
		})
	}

	function toggleDifficultyInput() {
		let difficulty = document.getElementById('difficulty-setting')
		
		if (checkbox.checked == true) {
			difficulty.style.display = 'none'
			aiBanter.style.display = 'none'
			enemyNameLabel.style.display = 'block'
		} else {
			difficulty.style.display = 'block'
			aiBanter.style.display = 'inline'
			enemyNameLabel.style.display = 'none'
		}
	}

	function render() {
		addEventListeners()
		const form = document.querySelector('form')
		form.style.display = 'flex'
	}

	function unrender() {
		removeEventListeners()
		const form = document.querySelector('form')
		form.style.display = 'none'
	}

	return {
		render,
		unrender
	}
})()

const gameboard = (function() {
	let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	const htmlGameboard = document.querySelector('.gameboard')
	let currentPlayer = p1

	function togglePlayer() {
		currentPlayer == p1 ? currentPlayer = p2 : currentPlayer = p1
	}

	function placeMarker(marker, index) {
		let cells = document.querySelectorAll('.cell')
		for (i of cells) {
			if (i.dataset.index == index) {
				div = i
			}
		}

		if (typeof board[index] == typeof '') {
			console.error('Somebody has already gone there.')
		} else {
			div.classList.add(`active-${marker}`)
			div.innerText = `${marker}`
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
				console.log(`${board[state[1]]} wins`)
				return board[state[1]] == 'o' ? -1 : 1
			}
		}
		return 0
	}

	function render() {
		htmlGameboard.style.display = 'grid'
		for (i of board) {
			let div = document.createElement('div')
			div.classList.add('cell', 'window', 'flex')
			div.setAttribute('data-index', board.indexOf(i))
			div.addEventListener('click', function() {
				currentPlayer.playTurn(div.dataset.index)
				togglePlayer()
			})
			htmlGameboard.appendChild(div)
		}
	}
	
	function unrender() {
		while (htmlGameboard.lastChild) {
			htmlGameboard.removeChild(htmlGameboard.lastChild)
		}
		htmlGameboard.style.display = 'none'
	}

	function getCurrentPlayer() {
		return currentPlayer
	}
	
	return {
		board,
		togglePlayer,
		placeMarker,
		checkForWin,
		render,
		unrender,
		getCurrentPlayer
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

	function setMarker(bool) {
		bool ? marker = 'x' : marker = 'o'
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