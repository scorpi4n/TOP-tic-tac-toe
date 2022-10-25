function evaluateGame(state) {
	let value = 0

	if (gameboard.checkForWin() != null) {
		gameboard.checkForWin() ? value = -10 : value = 10
	}

	for (i of state) {
		switch (i) {
			case ('o'):
				value += 1
				break
			
			case ('x'):
				value -= 1
				break
		
			default:
				break
		}
	}
	return value
}

function getMoves(state) {
	let moves = []
	for (i of state) {
		if (typeof i != typeof '') {
			let copyBoard = [...gameboard.board]
			copyBoard[state.indexOf(i)] = gameboard.getCurrentPlayer().getMarker()
			moves.push(copyBoard)
			console.log(copyBoard)
		}
	}
	return moves
}

function minimax(gameState, depth, isMaximizing) {
	if (depth == 0 || gameboard.checkForWin()) {
		console.log(evaluateGame(gameState))
		return evaluateGame(gameState)
	}
	
	if (isMaximizing) {
		maxEval = -Infinity
		for (move of getMoves(gameState)) {
			maxEval = Math.max(maxEval, minimax(move, depth - 1, false))
			// console.log(maxEval)
		}
		gameboard.togglePlayer()
		return maxEval
	}
	
	if (!isMaximizing) {
		minEval = Infinity
		for (move of getMoves(gameState)) {
			minEval = Math.min(minEval, minimax(move, depth - 1, true))
			// console.log(minEval)
		}
		gameboard.togglePlayer()
		return minEval
	}
}