'use strict';

//Grabbing Elements from HTML
//Select an ID
//n.b. Two way of selecting an ID via querySelecotor or via getElementByID
const score0El = document.querySelector('#score--0'); // opt1 selecting an ID
const score1El = document.getElementById('score--1'); // opt2 selecting an ID

//Select Class
const diceEl = document.querySelector('.dice');//This is an im
const btnNew = document.querySelector('.btn--new');
    const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//Initial Conditions

const init = function () {
    scores = [0, 0]; // BIG and final score stored in ARRAY
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden'); //Remove the dice img, by adding to HTML the hidden class
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden'); //Remove the dice img, by adding to HTML the hidden class
};
init();

//+++++++++++++++++++++++++++++++++
//          SWITCH PLAYER
//+++++++++++++++++++++++++++++++++

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    //2.Switch player 
    activePlayer = activePlayer === 0 ? 1 : 0;
    //3.Add Opacity to the inactive player
    //The method toggle will ADD the class if not there or REMOVE the class if there
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//+++++++++++++++++++++++++++++++++
//          ROLLING DICE
//+++++++++++++++++++++++++++++++++

btnRoll.addEventListener('click', function () {
    if (playing) {
        //1.Generating random number between 1 and 6
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2.Display dice figure with the random number - How to dynamically select a .png file
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`//template literale:`dice-${dice}.png` Il primo dice e'la prima parte del nome del file img sorgente,mentre il dice tra le graffe e' il valore tra 1-6 salvato nella var dice
        //3.Check if value of random = 1
        if (dice !== 1) {
            currentScore = currentScore + dice;// to verify do: console.log(`this is the current score = ${currentScore}`);
            //Dynamically adapt the current score for Player 1 and Player 2
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }

    }
});
//+++++++++++++++++++++++++++++
// HOLD BUTTON FUNCIONALITY
//+++++++++++++++++++++++++++++

//By pressing HOLD following happen:
//1.Transfer Current score to Global Score
//2. current score set to 0
//3. Switch Player if global score below 100 otherwise active plaer win

btnHold.addEventListener('click', function () {
    if (playing) {
        //1.Add current score to the active player global score.Scores is an array.
        scores[activePlayer] += currentScore;
        //To understand: it is score [1]= scores [1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. Check if player's score is >=100
        if (scores[activePlayer] >= 10) {
            //finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', init);


















