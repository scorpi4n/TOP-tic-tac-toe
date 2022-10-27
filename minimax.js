function evaluateGame(state) {
	let value = 0
	let winCheck = gameboard.checkForWin()

	switch (winCheck) {
		case -1:
			value += 10
			break;

		case 1:
			value -+ 10
			break;
	
		default:
			break;
	}

	// if (winCheck != 0) {
	// 	winCheck ? value = -10 : value = 10
	// }

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
	if (depth == 0 || gameboard.checkForWin()) {
		// gameboard.togglePlayer()
		return evaluateGame(gameState)
	}
	
	let moves = getMoves(gameState)
	
	if (isMaximizing) {
		maxEval = -Infinity
		gameboard.togglePlayer()
		for (move of moves) {
			maxEval = Math.max(maxEval, minimax(move, depth - 1, false))
		}
		return maxEval
	}
	
	if (!isMaximizing) {
		minEval = Infinity
		// gameboard.togglePlayer()
		for (move of moves) {
			minEval = Math.min(minEval, minimax(move, depth - 1, true))
		}
		return minEval
	}
}