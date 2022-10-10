const form = (function() {
	let submitBtn = document.getElementById('submit')
	
	let form1 = document.getElementById('form-1')
	let form2 = document.getElementById('form-2')
	
	function nextForm() {
		form1.style.left = '-200vw'
		form2.style.left = '15vw'
	}
	
	function prevForm() {
		form1.style.left = '15vw'
		form2.style.left = '200vw'
	}
	
	(function cacheBtns() {
		let nextBtn = document.getElementById('next')
		let backBtn = document.getElementById('back')
		nextBtn.addEventListener('click', nextForm)
		backBtn.addEventListener('click', prevForm)
	})()

	// return {
	// 	nextForm,
	// 	prevForm
	// }
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