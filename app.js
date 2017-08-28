
let gameScore, 		// Global score
	roundScore, 	// round score 
	activePlayer, 	// active player
	winningScore, 	// winning score
	progBar0,		// progress bar (player 1) 
	progBar1;		// progress bar (player 2)

progBar0 = document.getElementById('progress');
progBar1 = document.getElementById('progress-2');

// Initialize the game  
initialize();

// Building an HTML markup for the help menu
displayHelp();

// Event listener for the ROLL button
document.querySelector('.btn-roll').addEventListener('click', () => {

	// Generating random numbers for both dice
	let dice_1 = rand();
	let dice_2 = rand();

	// Settings to display the dice
	let diceDOM_0 = document.querySelector('.dice-0');
	let diceDOM_1 = document.querySelector('.dice-1');

	// Render dice images
	renderDice(diceDOM_0, diceDOM_1, dice_1, dice_2);

	// If one of the dice is 1 - the player loses his current score and it becomes the opponent's turn
	if (dice_1 === 1 || dice_2 === 1) {

		// Display progress bars for each player
		progressBar(gameScore[0], progBar0);
		progressBar(gameScore[1], progBar1);

		// Display the current score above each player
		renderGameScore(activePlayer, 0, 'Oops!');

		// Display animations on dice that equals to 1  
		diceRollingAnimation();

		// Switch players, reset the current score
		nextTurn();

		// When the player rolls two 6 in a row - he loses his entire score and it becomes the opponent's turn
	} else if (dice_1 === 6 && dice_2 === 6) {

		// Reset the entire score to zero
		gameScore[activePlayer] = 0;

		// Render the score
		document.querySelector('#score-' + activePlayer).textContent = '0';

		// Display progress bars for each player
		progressBar(gameScore[0], progBar0);
		progressBar(gameScore[1], progBar1);
			
		// Display the current score above each player
		renderGameScore(activePlayer, 0, 'rolled');

		// Display animations on dice that equals to 1  
		diceRollingAnimation();

		// Switch players, reset the current score
		nextTurn();

		// When the player rolls 2,3,4,5,6 - the total sum is added up to his current score
	} else if(dice_1 !== 1 || dice_2 !== 1) {

		// Storing the current score
		roundScore += dice_1 + dice_2;

		// Display the current score above each player
		renderGameScore(activePlayer, roundScore, 'rolled');

		// Display progress bars for each player
		progressBar(gameScore[0], progBar0);
		progressBar(gameScore[1], progBar1);

	} else {
		// Switch players, reset the current score
		nextTurn();
	}
});

// Event listener for the Hold button 
document.querySelector('.btn-hold').addEventListener('click', () => {

	// Add current score to the player's global score
	gameScore[activePlayer] += roundScore;

	// Update the UI
	document.querySelector('#score-' + activePlayer).textContent = gameScore[activePlayer];

	// Check if the player won the game
	setWinningScore();

	// Display progress bars for each player
	progressBar(gameScore[0], progBar0);
	progressBar(gameScore[1], progBar1);

	// Display a placeholder for the score input field
	defaultScorePlaceholder(winningScore);

	// Checking for the winner
	if (gameScore[activePlayer] >= winningScore) {
		
		// preventing the progress bar to go off the scale (higher than 100%)
		if (activePlayer === 0) {
			progressWinFix(progBar0);	
		} else {
			progressWinFix(progBar1);
		}

		// Replace the active player with the 'Winner!' 
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';		
		// When the winner is found, hide the dice
		document.querySelector('.dice-0').style.display = 'none';
		document.querySelector('.dice-1').style.display = 'none';
		// Replace the active player class with the winner
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

		// remove the Roll and Hold buttons
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
			
	// If no winner is found - next turn		
	} else {
		nextTurn();
	}		
});


// Animation when the player rolls 1 or two 6 in a row
function diceRollingAnimation() { 

	let img1 = document.querySelector('.dice-0');
	let img2 = document.querySelector('.dice-1');

	// When the player rolls two 6 in a row
	if ((img1.src.indexOf('dice-6.png') != -1) && (img2.src.indexOf('dice-6.png') != -1)) {
		document.querySelector(".dice-0").classList.add("dice-0-animation");
		document.querySelector(".dice-1").classList.add("dice-1-animation");

		setTimeout( () => {
			document.querySelector(".dice-0").classList.remove("dice-0-animation");
			document.querySelector(".dice-1").classList.remove("dice-1-animation");
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
		}, 500);

	// When the player rolls two 1 in a row
	} else if ((img1.src.indexOf('dice-1.png') != -1) && (img2.src.indexOf('dice-1.png') != -1)) {
		document.querySelector(".dice-0").classList.add("dice-0-animation");
		document.querySelector(".dice-1").classList.add("dice-1-animation");
		
		setTimeout( () => {
			document.querySelector(".dice-0").classList.remove("dice-0-animation");
			document.querySelector(".dice-1").classList.remove("dice-1-animation");
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
		}, 500);

	// When the player rolls 1 (upper dice) 		
	} else if (img1.src.indexOf('dice-1.png') != -1) {
		document.querySelector(".dice-0").classList.add("dice-0-animation");

		setTimeout( () => {
			document.querySelector(".dice-0").classList.remove("dice-0-animation");
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
		}, 500);

	// When the player rolls 1 (lower dice) 	
	} else if (img2.src.indexOf('dice-1.png') != -1 )  {
		document.querySelector(".dice-1").classList.add("dice-1-animation");		
		
		setTimeout( () => {
			document.querySelector(".dice-1").classList.remove("dice-1-animation");
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
		}, 500);
	}
}


// Next turn
function nextTurn() {
	
	// Changing active players 
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	// When it's another player's turn, reset the round score to 0 
	roundScore = 0;

	// Switch active players
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}


// Reset all info 
document.querySelector('.btn-new').addEventListener('click', initialize);


// Display the current score above each player
function renderGameScore(myActivePlayer, myRoundScore, myString) {

	if (myActivePlayer === 0) {
		document.getElementById("current-0").style.display = 'block';
		document.getElementById("current-0").classList.add("current-0-animation");
		document.querySelector(".current-0-animation").textContent = myRoundScore + ' ' + myString; 
		
		setTimeout( () => {
			document.getElementById("current-0").classList.remove("current-0-animation");
			document.getElementById("current-0").style.display = 'none';
		}, 600);

	} else {
		document.getElementById("current-1").style.display = 'block';
		document.getElementById("current-1").classList.add("current-1-animation");
		document.querySelector(".current-1-animation").textContent = myRoundScore + ' ' + myString;
		
		setTimeout(() => {
			document.getElementById("current-1").classList.remove("current-1-animation");
			document.getElementById("current-1").style.display = 'none';
			}, 600);
		}
}

// Initialize the game 
function initialize() {
	gameScore = [0,0];
	activePlayer = 0;
	roundScore = 0;
	
	// Reset the input field and set the default winning score to 100
	document.forms['score-form'].reset();
	winningScore = 100;
	defaultScorePlaceholder(winningScore);

	// Reset the progress bars for both players
	progBar0.style.height = 0;
	progBar1.style.height = 0;

	// Display the Roll and Hold buttons
	document.querySelector('.btn-roll').style.display = 'block';
	document.querySelector('.btn-hold').style.display = 'block';

	for(let i=0; i<=1; i+=1) { 
		// Display the dice
		document.querySelector('.dice-' + i).style.display = 'none';
		// Display the game score
		document.getElementById('score-' + i).textContent = '0';
		// Remove the winner and active classes
		document.querySelector('.player-' + i + '-panel').classList.remove('winner');
		document.querySelector('.player-' + i + '-panel').classList.remove('active');
	}
	// Display Player 1 and Player 2
	document.getElementById('name-0').textContent = 'Player 1';	
	document.getElementById('name-1').textContent = 'Player 2';	
	// Highlight the active player
	document.querySelector('.player-0-panel').classList.add('active');
}


// Progress bar
function progressBar(myScore, progBarId) {
// Headache, pain, stress, persistence, embarrassed myself in Stackoverflow - this is how this line of code was born! 
	progBarId.style.height = ((myScore / winningScore) * 100) + '%';
}

// Preventing the progress bar to go off the scale (higher than 100%)
function progressWinFix(winnerID) {
	winnerID.style.height = 100 + '%';
}

// Display placeholder - default score to win the game
function defaultScorePlaceholder(defaultScore) {
	document.querySelector('.score-input').setAttribute('placeholder', 'Score to win: ' + defaultScore);
}

// Set the winning score
function setWinningScore() {
	// Get the value of the input field
	let inputScore = document.querySelector('.score-input').value;
	// Set the winning score equals to the input  
	if (inputScore) { // write a script to the check if input isNan! 
		winningScore = inputScore;
	// else, set the default winning score 
	} else {
		winningScore = 100; // default winning score
	}	
}

// function to display the dice imgs
function renderDice(diceOne, diceTwo, randDice1, randDice2) {
	diceOne.style.display = 'block';
	diceOne.src = 'dice-' + randDice1 + '.png'; 
	diceTwo.style.display = 'block';
	diceTwo.src = 'dice-' + randDice2 + '.png'; 
}


// Help menu to display the game rules
document.querySelector('.help-menu').addEventListener('click', () => { 
	let helpMenu = document.querySelector('.help-info');
	helpMenu.style.display = 'block';
	let modal = document.querySelector('.modal');
	modal.style.display = modal.style.display === 'none' ? '' : 'none';
});


// if a user clicks anywhere outside the modal, close the Help menu
let myModal = document.querySelector('.modal');
window.onclick = (event) => {
	if(event.target == myModal) {
		myModal.style.display = 'none';
	}
};


// Random number generator (1 - 6)
function rand() {
	return (Math.floor(Math.random() * 6) + 1);
}

// Building an HTML markup for the help menu
function helpMarkup() {
	let drawMarkup = '';
	drawMarkup += '<div class="help-header">';
    drawMarkup += '<p>The game has two players competing with each other to reach a winning score (100 points). Every turn, a player rolls the dice and the number gets added to his round score. In the game, players are faced with a few decisions:</p></div>';
    drawMarkup += '<div class="help-body">';
    drawMarkup += '<p><span>ROLL</span> - When the player rolls a</p>'; 
    drawMarkup += '<p><img src="dice-1.png" alt="dice-1"> The player scores nothing and it becomes another player’s turn.</p>';
    drawMarkup += '<p><img src="dice-2.png" alt="dice-2"> ';
    drawMarkup += '<img src="dice-3.png" alt="dice-3"> ';
    drawMarkup += '<img src="dice-4.png" alt="dice-4"> ';
    drawMarkup += '<img src="dice-5.png" alt="dice-5"> ';
    drawMarkup += '<img src="dice-6.png" alt="dice-6"> ';
    drawMarkup += 'The number is added to the player\'s score and the player\'s turn continues.</p>';
    drawMarkup += '<p><img src="dice-6.png" alt="dice-6"> ';
    drawMarkup += '<img src="dice-6.png" alt="dice-6"> ';
    drawMarkup += 'The player loses his entire score when he rolls two 6 in a row and it becomes another player’s turn.</p>';
    drawMarkup += '<p><span>HOLD</span> – The player’s round score is added to his global score.</p>'; 
    drawMarkup += '<p><span class="default-score">Score to win: 100</span> - The winning score can be adjusted in the bottom field.</p>';
    drawMarkup += '</div>';
    return drawMarkup;
}

function displayHelp() {
	let getElement = document.querySelector('.help-info');
	getElement.innerHTML += helpMarkup();
}