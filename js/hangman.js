//! ========================== VARIABLES =============================
const words = [
    "pneumonia",
    "triphthong",
    "embezzle",
    "kayak",
    "kazoo",
    "schnapps",
    "klutz",
    "thumbscrew",
    "zilch",
];

let score = 0;
let highScore = 0;
let lives = 10;
let randomNumber = Math.trunc(Math.random() * words.length);
let dashedLetters = [];
let keyPressed = null;
let correctGuess = false;

//!======================= HTML Elements ==============================
const wordEl = document.getElementById("word");
const scoreEl = document.getElementById("scoreSpan");
const highScoreEl = document.getElementById("highScoreSpan");
const livesEl = document.getElementById("livesLeftSpan");
const againBtn = document.getElementById("again");
const nextBtn = document.getElementById("nextWord");

//!======================== FUNCTIONS ==============================

//! ---- function for displaying the word on the screen -----
function displayWord() {
    const word = String(words[randomNumber]);
    wordArray = Array.from(word);
    const randomIndex = []; // array for storing the randomly generated indexes for the dashes in the word
    for (i = 0; i <= word.length / 2; ++i) {
        randomIndex.push(Math.trunc(Math.random() * word.length));
    }

    for (i = 0; i < word.length; ++i) {
        if (randomIndex.includes(i)) {
            //stores the dashed letters in a separate array with their indexes in the original word
            dashedLetters.push([wordArray[i], i]);
            //replaces the letter with a dash
            wordArray[i] = "_";
        }
    }
    wordEl.textContent = wordArray.join(" ");
}

//! ------- function for validating the input --------
//function for accepting only alphanumeric values
function isAlphaNumeric(val) {
    let validInput = /^[0-9a-zA-Z]$/;
    console.log(val.match(validInput));
    return val.match(validInput);
}

//!---------- function to handle the input ---------
//it handles the input on a key press event triggered by keydown event
function input(event) {
    keyPressed = event.key.toLowerCase();
    if (isAlphaNumeric(keyPressed)) {
        checkLetter(keyPressed);
        if (lives === 0) {
            nextBtn.disabled = true;
            alert("Game is over!! Click on again button to continue.");
        }
    }
}

//!--------- function to update according to letter pressed -------
//This function updates the letters, scores and lives field depending upon the matching of the letter
function checkLetter(keyPressed) {
    let index = -1;
    correctGuess = false;
    for (let i = 0; i < dashedLetters.length; ++i) {
        if (dashedLetters[i][0] === keyPressed) {
            correctGuess = true;
            index = i;
            score += 10;
            scoreEl.textContent = score;
            revivalLetters(index);
        }
    }
    if (!correctGuess) {
        if (lives > 0) {
            lives--;
            livesEl.textContent = lives;
        }
    }
}

//!------- function to revive the letters on display ----------
function revivalLetters(index) {
    wordArray[dashedLetters[index][1]] = dashedLetters[index][0];
    dashedLetters.splice(index, 1);
    wordEl.textContent = wordArray.join(" ");
}

//!------- resetting the properties ---------
function reset() {
    highScore = score > highScore ? score : highScore;
    wordArray = [];
    dashedLetters = [];
    score = 0;
    lives = 10;
    correctGuess = false;
    nextBtn.disabled = false;
    randomNumber = Math.trunc(Math.random() * words.length);
    displayWord();

    highScoreEl.textContent = highScore;
    livesEl.textContent = lives;
    scoreEl.textContent = score;
}

//!========================= EXECUTION ================================
displayWord();
livesEl.textContent = lives;
document.addEventListener("keydown", input);
againBtn.addEventListener("click", reset);
nextBtn.addEventListener("click", () => {
    randomNumber = Math.trunc(Math.random() * words.length);
    displayWord();
});
