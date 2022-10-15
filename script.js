const form = (function() {
	const checkbox = document.getElementById('ai')
	checkbox.addEventListener('input', toggleDifficultyInput)
	const aiBanter = checkbox.nextElementSibling
	const enemyNameInput = document.querySelector('label[for="name-2"]')
	// const submitBtn = docuent.getElementById('submit')
	
	function addEventListeners() {
		checkbox.addEventListener('input', toggleDifficultyInput)
	}
	
	function removeEventListeners() {
		checkbox.removeEventListener('input', toggleDifficultyInput)
	}

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

const p1 = playerFactory()
p1.setMarker('x')
const p2 = playerFactory()
p2.setMarker('o')

const gameboard = (function() {
	let board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	const htmlGameboard = document.querySelector('.gameboard')
	let currentPlayer = p1

	function togglePlayer() {
		currentPlayer == p1 ? currentPlayer = p2 : currentPlayer = p1
	}

	function pickCell(index) {
		let cells = document.querySelectorAll('.cell')
		for (i of cells) {
			if (i.dataset.index == index) {
				return i
			}
		}
	}

	function placeMarker(marker, index) {
		let div = pickCell(index)

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
				console.log(`${board[state[0]]} wins`)
				break
			}
		}
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



(function(){
	form.unrender()
	gameboard.render()
})()

