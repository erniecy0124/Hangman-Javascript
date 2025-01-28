//Hang Man
const word = "javascript";

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//A function that create the guess tiles based on the length of the word
function create_guess(word) {
    let guess_box = []

    for (let i = 0; i < word.length; i++) {
        guess_box.push("?")
    }

    return guess_box
}

//Create an array containing a list of guessed words
function guessed_letters(guessed, letter) {
    guessed.push(letter)
    return guessed
}

//Print the welcome message
function welcome() {
    console.log("Welcome to the Javascript Hang Man!\n")
    console.log("Please guess the word correctly before you ran out! For each incorrect guess, the man will get closer to doom!!!\n")
}

//Get the state of the hangman
function get_state(numberofGuesses) {
    if (numberofGuesses == 0) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|             \n")
		console.log("|             \n")
        console.log("|             \n")
        console.log("|             \n")
    } else if (numberofGuesses == 1) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|             \n")
        console.log("|             \n")
        console.log("|             \n")
    } else if (numberofGuesses == 2) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|     /       \n")
        console.log("|             \n")
        console.log("|             \n")
    } else if (numberofGuesses == 3) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|     /|      \n")
        console.log("|             \n")
        console.log("|             \n")
    }
    else if (numberofGuesses == 4) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|     /|\\     \n")
        console.log("|             \n")
        console.log("|             \n")
    } else if (numberofGuesses == 5) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|     /|\\     \n")
        console.log("|     /       \n")
        console.log("|             \n")
    }

    else if (numberofGuesses == 6) {
        console.log("________      \n")
		console.log("|      |      \n")
		console.log("|      0      \n")
		console.log("|     /|\\     \n")
        console.log("|     / \\      \n")
        console.log("|             \n")
    }
}

//Check if the user have guessed the word
function victory_validity(guess_box) {
    let correctletters = 0;
    for (let i = 0; i < guess_box.length; i++) {
        if (guess_box[i] != "?") {
            correctletters++;
        }
    }
    if (correctletters == word.length) {
        return true;
    }
    return false;
}

function same_letter(guess_box, guessed_box, letter) {
    if (letter in guess_box || letter in guessed_box) {
        return true;
    }
    return false;
}

function guessing(guess_box, guessed_box, guess) {

    //Check if the number of guesses reach 6
    if (guess == 6) {
        console.log("Oh no! He's dead!!!\n")
        get_state(guess)
        console.log("The hidden letter", guess_box)
        console.log("The letters you have guessed: ", guessed_box)
        return
    }

    //Check if the user have won
    if (victory_validity(guess_box)) {
        console.log("You have won!! Congragulations!!\n")
        console.log("The hidden letter", guess_box)
        console.log("The letters you have guessed: ", guessed_box)
        return
    }

    rl.question("What is your letter? ", letter => {
        //Check if the guessed letter is in the word
        console.log("\n")

        if (word.includes(letter)) {
            console.log("You guessed correctly!!\n")
            for (let i = 0; i < word.length; i++) {
                if (word[i] == letter) {
                    guess_box[i] = letter
                }         
            } 
        } else {
            console.log("Oops! You guessed incorrectly!\n")
            guessed_letters(guessed_box, letter)
            guess++

        }
        core(guess_box, guessed_box, guess)
    });
    
}

//Core Game
function core(guess_box, guessed_box, guessnum) {
    get_state(guessnum)
    console.log("The hidden letter", guess_box)
    console.log("The letters you have guessed: ", guessed_box)
    guessing(guess_box, guessed_box, guessnum)
}


//Main Function
function main() {
    let guess_box = create_guess(word)
    let guessed_box = []

    welcome()
    get_state(0)
    console.log("The hidden letter", guess_box)
    console.log("The number you have guessed: ", guessed_box)

    guessing(guess_box, guessed_box, 0)
}

main()