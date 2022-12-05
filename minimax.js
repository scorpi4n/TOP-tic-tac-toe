function evaluateGame(state) {
	let value = 0
	let winCheck = checkForWin(state)

	if (winCheck == -1) {
		value += 10
		for (i of state) {
			if (typeof i == typeof 0) {
				value++
			}
		}
	} else if (winCheck == 1) {
		value -= 10
		for (i of state) {
			if (typeof i == typeof 0) {
				value--
			}
		}
	}

	return value
}

function getMoves(state) {
	let moves = []
	for (i of state) {
		if (typeof i != typeof '') {
			let copyBoard = [...state]
			copyBoard[state.indexOf(i)] = gameboard.getCurrentPlayer().getMarker()
			moves.push(copyBoard)
			console.log(copyBoard)
		}
	}
	return moves
}

function minimax(gameState, depth, isMaximizing) {
	if (depth == 0) {
		// return static evaluation
		return evaluateGame(gameState)
	}

	let moves = getMoves(gameState)

	// is maximizing player
	if (isMaximizing) {
		maxEval = -Infinity
		gameboard.togglePlayer()
		for (move of moves) {
			maxEval = Math.max(maxEval, minimax(move, depth - 1, false))
		}
		return maxEval
	}

	// is NOT maximizing player
	if (!isMaximizing) {
		minEval = Infinity
		for (move of moves) {
			minEval = Math.min(minEval, minimax(move, depth - 1, true))
		}
		return minEval
	}
}