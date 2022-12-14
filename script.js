const p1 = playerFactory()
const p2 = playerFactory()

const WIN_STATES = [
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

const form = (function () {
	const xRadio = document.getElementById('X')
	// const oRadio = document.getElementById('O')
	const userNameInput = document.getElementById('name-1')
	const checkbox = document.getElementById('ai')
	const aiBanter = checkbox.nextElementSibling
	const difficultyDropdown = document.getElementById('difficulty')
	const enemyNameLabel = document.querySelector('label[for="name-2"]')
	const enemyNameInput = document.getElementById('name-2')
	const submitBtn = document.getElementById('submit')

	function submit() {
		p1.setMarker(xRadio.checked)
		p2.setMarker(!xRadio.checked)

		if (!userNameInput.value) {
			p1.setName(p1.getMarker().toUpperCase())
		} else {
			p1.setName(userNameInput.value)
		}

		if (!enemyNameInput.value) {
			p2.setName(p2.getMarker().toUpperCase())
		} else {
			p2.setName(enemyNameInput.value)
		}

		unrender()
		gameboard.render()
	}

	function addEventListeners() {
		checkbox.addEventListener('input', toggleDifficultyInput)
		submitBtn.addEventListener('click', submit)
	}
	addEventListeners()

	function removeEventListeners() {
		checkbox.removeEventListener('input', toggleDifficultyInput)
		submitBtn.removeEventListener('click', submit)
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

const gameboard = (function () {
	let board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const htmlGameboard = document.querySelector('.gameboard')
	let currentPlayer = p1

	const scoreboard = (function () {
		const displayBoard = document.getElementById('scoreboard')

		function refresh() {
			displayBoard.innerText = `${p1.getName()} has won ${p1.winCount} times. ${p2.getName()} has won ${p2.winCount} times`
		}

		function render() {
			refresh()
			displayBoard.style.display = 'block'
		}

		return {
			render,
			refresh
		}
	})()

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
			console.log(board)
			console.error('Somebody has already gone there.')
		} else {
			div.classList.add(`active-${marker}`)
			div.innerText = `${marker}`
			board.splice(index, 1, marker)
		}
	}

	function checkForWin() {
		for (state of WIN_STATES) {
			if (board[state[0]] == board[state[1]] && board[state[1]] == board[state[2]]) {
				if (p1.getMarker() == board[state[1]]) {
					console.log(`${p1.getName()} wins`)
					p1.winCount++
				} else {
					console.log(`${p2.getName()} wins`)
					p2.winCount++
				}

				scoreboard.refresh()
				removeEventListeners()

				if (prompt("Play again? y/N") == "y") {
					gameboard.unrender()
					form.render()
					board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
				}

				break
			}
		}

		if (board.filter(function (i) { return typeof i == typeof '' ? i : null }).length == 9) {
			alert("It's a tie!")
		}
	}

	function removeEventListeners() {
		let cells = htmlGameboard.querySelectorAll('.cell')
		for (_ of cells) {
			_.removeEventListener('click', playTurn)
		}
	}

	function playTurn() {
		currentPlayer.playTurn(this.dataset.index)
		togglePlayer()
	}

	function render() {
		htmlGameboard.style.display = 'grid'
		for (i of board) {
			let div = document.createElement('div')
			div.classList.add('cell', 'window', 'flex')
			div.setAttribute('data-index', board.indexOf(i))
			div.addEventListener('click', playTurn)
			htmlGameboard.appendChild(div)
		}
		scoreboard.render()
	}

	function unrender() {
		while (htmlGameboard.lastChild) {
			htmlGameboard.removeChild(htmlGameboard.lastChild)
		}
		htmlGameboard.style.display = 'none'
	}

	return {
		placeMarker,
		checkForWin,
		render,
		unrender
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

	let winCount = 0

	return {
		setName,
		getName,
		setMarker,
		getMarker,
		playTurn,
		winCount
	}
}