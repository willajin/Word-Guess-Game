// HANGMAN GAME
// THEME: CAT BREEDS

// define variables and list of words
var words = ["siberian", "ragdoll", "munchkin", "bengal", "chartreux", "scottishfold", "korat", "persian"];
var winsElem = document.getElementById("wins");
var currentWordElem = document.getElementById("current-Word");
var remainingGuessesElem = document.getElementById("remaining-Guesses");
var lettersGuessedElem = document.getElementById("letters-Guessed");
var youWon = document.getElementById("you-won-text");
var youLose = document.getElementById("you-lose-text");
var catImage = document.getElementById("cat-image");
var wins = 0;               // total number of wins
var hasFinished;        // if game has finished (win or lose)
var currentWordIndex;   // array index of current word
var currentWord;        // current word to be guessed
var remainingGuesses;   // remaining number of guesses
var lettersGuessed;     // array of letters already guessed

// hide messages
youWon.style.cssText = "display: none";
youLose.style.cssText = "display: none";
// hide images
siberian.style = "display: none";
ragdoll.style = "display: none";
munchkin.style = "display: none";
bengal.style = "display: none";
chartreux.style = "display: none";
scottishfold.style = "display: none";
korat.style = "display: none";
persian.style = "display: none";

// update display
function updateDisplay() {
    remainingGuessesElem.textContent = remainingGuesses;
    lettersGuessedElem.textContent = lettersGuessed;
    currentWordElem.textContent = currentWord;
    winsElem.textContent = wins;

    // check if user loses
    if (remainingGuesses <= 0) {
        hasFinished = true;
        youLose.style.cssText = "display: block";    // display 'you lose' message
    }
}

// initialize game with random word and cleared stats
function startGame() {
    // reset stats
    currentWord = [];
    remainingGuesses = 10;
    lettersGuessed = [];
    youWon.style.cssText = "display: none";
    youLose.style.cssText = "display: none";
    siberian.style = "display: none";
    ragdoll.style = "display: none";
    munchkin.style = "display: none";
    bengal.style = "display: none";
    chartreux.style = "display: none";
    scottishfold.style = "display: none";
    korat.style = "display: none";
    persian.style = "display: none";

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
    if (currentWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        youWon.style.cssText = "display: block";    // display 'you won' message

        if (currentWordIndex === 0) {
            siberian.style = "display: block";
        }

        else if (currentWordIndex === 1) {
            ragdoll.style = "display: block";
        }

        else if (currentWordIndex === 2) {
            munchkin.style = "display: block";
        }

        else if (currentWordIndex === 3) {
            bengal.style = "display: block";
        }

        else if (currentWordIndex === 4) {
            chartreux.style = "display: block";
        }

        else if (currentWordIndex === 5) {
            scottishfold.style = "display: block";
        }

        else if (currentWordIndex === 6) {
            korat.style = "display: block";
        }

        else if (currentWordIndex === 7) {
            persian.style = "display: block";
        }
    }
};

startGame();