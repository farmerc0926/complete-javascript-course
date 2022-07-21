"use strict";

/*
console.log(document.querySelector(".message").textContent);
document.querySelector(".message").textContent = "Correct Number! 🎉";
console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

function setMessage(message) {
    document.querySelector(".message").textContent = message;
}

function setScore(score) {
    document.querySelector(".score").textContent = score;
}

//secret number for guessing game
//between 1-20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
//document.querySelector(".number").textContent = secretNumber;

//score starts at 20
let score = 20;

//highscore is 0
let highScore = 0;

//event listener
document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);

    //bad input
    if (!guess) setMessage("Not a number!");
    //player wins
    else if (guess === secretNumber) {
        setMessage("Correct Number!");
        document.querySelector(".number").textContent = secretNumber;

        //written as in-line styles
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        //track highscore
        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    } else {
        if (score > 1) {
            setMessage(guess > secretNumber ? "Too High!" : "Too Low!");
            score--;
            setScore(score);
        } else {
            setScore(0);
            setMessage("You Lost!");
        }
    }
});

//reset game if again is pressed
document.querySelector(".again").addEventListener("click", function () {
    //reset state variables
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(secretNumber);

    //reset page text and styles
    setMessage("Start Guessing...");
    document.querySelector(".number").textContent = "?";
    setScore(score);
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".guess").value = "";
});
