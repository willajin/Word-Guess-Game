// HANGMAN GAME
// THEME: CAT BREEDS

// define variables and list of words
var words = ["siberian", "ragdoll", "munchkin", "bengal", "chartreux", "scottishfold", "korat", "persian"];
var winsElem = document.getElementById("wins");
var currentWordElem = document.getElementById("current-Word");
var remainingGuessesElem = document.getElementById("remaining-Guesses");
var lettersGuessedElem = document.getElementById("letters-Guessed");
var wins = 0;               // total number of wins
var hasFinished;        // if game has finished (win or lose)
var currentWordIndex;   // array index of current word
var currentWord;        // current word to be guessed
var remainingGuesses;   // remaining number of guesses
var lettersGuessed;     // array of letters already guessed

// update display
function updateDisplay() {
    remainingGuessesElem.textContent = remainingGuesses;
    lettersGuessedElem.textContent = lettersGuessed;
    currentWordElem.textContent = currentWord;
    winsElem.textContent = wins;

    // check if game is finished
    if (remainingGuesses <= 0) {
        hasFinished = true;
        console.log(hasFinished);
    }
}

// initialize game with random word and cleared stats
function startGame() {
    // reset stats
    currentWord = [];
    remainingGuesses = 10;
    lettersGuessed = [];

    // choose random index of word array
    currentWordIndex = Math.floor(Math.random() * words.length);
    console.log(currentWordIndex);

    // display current word
    updateDisplay();
    console.log(words[currentWordIndex]);
    console.log(currentWord);

    // display random word as "_"
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        currentWord.push("_");
    }
    currentWordElem.textContent = currentWord.join(" ");
}

// get user key input (letter a-z)
document.onkeyup = function (event) {
    // check if game has finished
    // reset game if finished
    if (hasFinished) {
        startGame();
        hasFinished = false;
    }
    // continue game if not finished
    // check if input is a-z
    else if (event.keyCode >= 65 && event.keyCode <= 90) {
        matchLetter(event.key.toLowerCase());
    }
};

// determine if input matches with letter in word
function matchLetter(input) {
    var indexes = [];
    // check if user has remaining guesses
    if (remainingGuesses > 0) {
        hasFinished = false;
    }
    // check if input was already guessed
    if (lettersGuessed.indexOf(input) === -1) {
        lettersGuessed.push(input);

        // check if input matches with any instances of letter in current word
        // store matched positions in indexes array
        for (var i = 0; i < words[currentWordIndex].length; i++) {
            if (words[currentWordIndex][i] === input) {
                indexes.push(i);
            }
        }

        // if match, push matched letters to current word
        if (indexes.length > 0) {
            for (var i = 0; i < indexes.length; i++) {
                currentWord[indexes[i]] = input;
            }
        }
        // if no match, decrease remaining guesses
        else {
            remainingGuesses--;
        }

    }
    updateDisplay();
    checkWin();
};

// check if user wins and reset game
function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        wins++;
        startGame();
    }
};

startGame();