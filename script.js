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

	function placeMarker(marker, index) {
		let cells = document.querySelectorAll('.cell')
		for (i of cells) {
			if (i.dataset.index == index) {
				div = i
			}
		}
		div.classList.add(`active-${marker}`)
		board.splice(index, 1, marker)
	}
	
	return {
		render,
		placeMarker
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

	return {
		getName,
		setName,
		setMarker,
		getMarker
	}
}