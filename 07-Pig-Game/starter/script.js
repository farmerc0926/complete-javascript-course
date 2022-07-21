"use strict";

//game
//player can keep rolling to build up a "round" score
//if player rolls a one their "round" score is set to 0 and their turn is over
//they can end their turn at any point which
//adds the round score to their total score
//you can reset the game
//if total score is 100 player wins

//get elements we will be using

const scoreEls = [
    document.getElementById("score--0"),
    document.getElementById("score--1"),
];
const currentScoreEls = [
    document.getElementById("current--0"),
    document.getElementById("current--1"),
];
const playerEls = [
    document.querySelector(".player--0"),
    document.querySelector(".player--1"),
];
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//set defaults
diceEl.classList.add("hidden");

//state variables
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//helper functions
function addToScore(player, score) {
    scores[player] += score;
    scoreEls[player].textContent = scores[player];
}

function addToCurrentScore(player, score) {
    currentScore += score;
    currentScoreEls[player].textContent = currentScore;
}

function clearCurrentScore() {
    currentScore = 0;
    currentScoreEls[0].textContent = 0;
    currentScoreEls[1].textContent = 0;
}

function switchPlayers() {
    playerEls[0].classList.toggle("player--active");
    playerEls[1].classList.toggle("player--active");
    activePlayer = activePlayer ? 0 : 1;
}

function resetGame() {
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    scoreEls[0].textContent = 0;
    scoreEls[1].textContent = 0;
    playerEls[0].classList.add("player--active");
    playerEls[1].classList.remove("player--active");
    playerEls[0].classList.remove("player--winner");
    playerEls[1].classList.remove("player--winner");
    clearCurrentScore();
    playing = true;
}

//listeners
btnRoll.addEventListener("click", function () {
    if (playing) {
        //generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //check for 1
        if (dice !== 1) {
            //add dice current score
            addToCurrentScore(activePlayer, dice);
        } else {
            //switch to next player
            clearCurrentScore();
            switchPlayers();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        addToScore(activePlayer, currentScore);

        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add("hidden");
            playerEls[activePlayer].classList.remove("player--active");
            playerEls[activePlayer].classList.add("player--winner");
        } else {
            clearCurrentScore();
            switchPlayers();
        }
        clearCurrentScore();
    }
});

btnNew.addEventListener("click", resetGame);

//reset game on start

resetGame();
