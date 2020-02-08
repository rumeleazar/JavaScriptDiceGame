
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

NEW RULES:
- A player looses his entire score when he rolls two 6 in a row, then it's the next player's turn (Done)
- Add an input field in the html where the user can change the winning score (Done)
- Add another dice, when 1 dice gets the value of 1, reset round score and it will be the next player's turn.(Done)
*/

startGame();

var currentScore,dice1,dice2,currentPlayer,playerScores,isPlaying,number6count,winningScore;
dice1 = 0;
dice2 = 0;
currentScore = 0;
currentPlayer = 0;
playerScores = [0,0];
isPlaying = false; 
number6count = 0;

document.querySelector(".dice1").style.display = 'none';
document.querySelector(".dice2").style.display = 'none';



	document.querySelector(".btn-roll").addEventListener('click', function(){

		if(isPlaying){

			//When user clicks the roll dice, it will roll the dice from 1-6 and output it
			dice1 = Math.floor((Math.random() * 6) + 1);
			dice2 = Math.floor((Math.random() * 6) + 1);
			document.querySelector(".dice1").style.display = 'block';
			document.querySelector(".dice1").src = 'static/dice-' + dice1 + '.png';
			document.querySelector(".dice2").style.display = 'block';
			document.querySelector(".dice2").src = 'static/dice-' + dice2 + '.png';

			//Change the current score and add succeeding scores
			//When the dice rolls into a 1, change the player
			if (dice1 !== 1 && dice2 !== 1) {
				currentScore += dice1 + dice2;
				document.querySelector("#current-" + currentPlayer).textContent = currentScore;
				//Dice number 6 counter
					if (dice1 == 6 || dice2 == 6){
						number6count += 1;
					}

					else {
						number6count = 0;
					}

				//End of dice number 6 counter

			}
			else {
				document.querySelector("#current-" + currentPlayer).textContent = '0';
				togglePlayer();
			}
			//end of dice roll

			//if the player rolls 2 number 6 in a row

			if (number6count == 2) {
				togglePlayer();
			}


		}

		//end of isPlaying

		else {
			document.querySelector("#current-" + currentPlayer).textContent = currentScore;
		}

		console.log(number6count);

	});


	document.querySelector(".btn-hold").addEventListener('click', function(){
		//Save the Current Score to the total score

		if (isPlaying){

			playerScores[currentPlayer] += currentScore;
			document.querySelector("#score-" + currentPlayer).textContent = playerScores[currentPlayer];

			if (playerScores[currentPlayer] >= winningScore) {
				document.querySelector("#name-" + currentPlayer).textContent = 'Winner';
				isPlaying = false;

			}
			else {
				togglePlayer();
			}

		}

		else {
			document.querySelector("#score-" + currentPlayer).textContent = playerScores[currentPlayer];
		}
		


	});

	//Reset all variables when new game button is clicked
	document.querySelector(".btn-new").addEventListener('click', startGame);








//Execute to change player turn and resets the current score
function togglePlayer(){
	number6count = 0;
	currentScore = 0;
	document.querySelector(".player-0-panel").classList.toggle('active');
	document.querySelector(".player-1-panel").classList.toggle('active');


	if (currentPlayer === 0){
		currentPlayer = 1;
	}
	else {
		currentPlayer = 0;
	}
};

// Execute to restart all the variables to 
function startGame() {
	dice1 = 0;
	dice2 = 0;
	currentScore = 0;
	currentPlayer = 0;
	playerScores = [0,0];
	isPlaying = false;
	winningScore = 0;
	document.querySelector('#startGame').style.display = 'none'
	document.querySelector('.submitButton').style.display = 'block';
	document.querySelector(".dice1").style.display = 'none';
	document.querySelector(".dice2").style.display = 'none';
	document.querySelector("#current-0").textContent = currentScore;
	document.querySelector("#current-1").textContent = currentScore;
	document.querySelector("#score-0").textContent = playerScores[currentPlayer];
	document.querySelector("#score-1").textContent = playerScores[currentPlayer];
	document.querySelector(".input-form").value = '';

};

//Execute to set the winning score
function getValue() {
	isPlaying = true;
	winningScore = document.querySelector(".input-form").value;
	document.querySelector('.submitButton').style.display = 'none';
	document.querySelector('#startGame').textContent = 'GAME START!';
	document.querySelector('#startGame').style.display = 'block';
	return winningScore;
}

