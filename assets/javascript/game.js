// HANGMAN GAME
// THEME: CAT BREEDS

// define variables and list of words
var words = ["siberian", "ragdoll", "munchkin", "bengal", "chartreux", "scottishfold", "korat", "persian"];
var winsElem = document.getElementById("wins");
var currentWordElem = document.getElementById("current-Word");
var remainingGuessesElem = document.getElementById("remaining-Guesses");
var lettersGuessedElem = document.getElementById("letters-Guessed");
var hasFinished = true;     // if game has finished (win or lose)
var currentWordIndex;        // array index of current word
var currentWord;
var remainingGuesses;
var lettersGuessed;

// update display
function updateWord() {
    remainingGuessesElem.textContent = remainingGuesses;
    lettersGuessedElem.textContent = lettersGuessed;
    currentWordElem.textContent = currentWord;
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
    updateWord();
    console.log(words[currentWordIndex]);
    console.log(currentWord);

    // display random word as "_"
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        currentWord.push("_");
    }
    currentWordElem.textContent = currentWord.join(" ");
}

startGame();

// get user key input (letter a-z)
document.onkeyup = function(event) {
    var input = (event.key).toLowerCase();
    console.log(input);

    // determine if key matches with letter in word  - indexOf currentWord
    ////////////////////////////// how to store multiple matching inputs? - for loop
    var index = words[currentWordIndex].indexOf(event.key);
    console.log(index);

    // if match, replace _ with letter textContent currentWord[foundIndex] = event.key
    if (index > -1) {
        currentWord[index] = input;
        //currentWordElem.textContent = currentWord;
    }

    // if not match, decrease number of guesses remaining
    // add letters guessed to an array
    ////////////////////////// remove letters already guessed - .splice
    else {
        remainingGuesses--;
        lettersGuessed.push(input);
    }
    updateWord();
}

////////////////////////// check if user wins or loses
// then reset game and display new word or continue playing