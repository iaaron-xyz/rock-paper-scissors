/*********************************************************
 * FUNCTION DECLARATIONS
 */

// Options and record
const choices = ["rock-user", "paper-user", "scissors-user"];
let record = {"user": 0, "computer": 0};

// Get computer choice
function getComputerChoice() {
    // Choose randomly a value among those options
    return chooseArrayItem(choices).split("-")[0]
}
// Play and choose the winner of the round
function playRound(playerChoice, computerChoice) {
    // User Choose rock
    if (playerChoice == "rock") {
        if (computerChoice == "rock") {
            return "Tie"
        }
        else if (computerChoice == "paper") {
            record.computer += 1;
            return `${computerChoice} beats ${playerChoice}. Computer wins this round!`
        }
        else {
            record.user += 1;
            return `${playerChoice} beats ${computerChoice}. You win this round!`
        }
    }
    // User Choose PAPER
    if (playerChoice == "paper") {
        if (computerChoice == "rock") {
            record.user += 1;
            return `${playerChoice} beats ${computerChoice}. You win this round!`
        }
        else if (computerChoice == "paper") {
            return "Tie"
        }
        else {
            record.computer += 1;
            return `${computerChoice} beats ${playerChoice}. Computer wins this round!`
        }
    }
    // User Choose SCISSORS
    if (playerChoice == "scissors") {
        if (computerChoice == "rock") {
            record.computer += 1;
            return `${computerChoice} beats ${playerChoice}. Computer wins this round!`
        }
        else if (computerChoice == "paper") {
            record.user += 1;
            return `${playerChoice} beats ${computerChoice}. You win this round!`
        }
        else {
            record.user += 1;
            return "Tie"
        }
    }
}
// Set the game to 5 rounds, Best 3 of 5 wins
function game() {
    // The game last 5 rounds
    for (let i = 0; i < 5; i++) {
        let user = getUserChoice();
        let computer = getComputerChoice();
        console.log(playRound(user, computer));
        console.log(record);
    }
    // Anounce the winner
    return anounceTheWinner() 

}
// Annoounce the winner of the game
function anounceTheWinner() {
    if (record.user > record.computer) {
        return "The winner is YOU!"
    }
    else if (record.user < record.computer) {
        return "The winner is the Computer!"
    }
    else {
        return "It is a Tie!"
    }
}

// HELPER FUNCTIONS
// Choose an array element randomly
function chooseArrayItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}


/*********************************************************
 * DOM MANIPULATION
 */
const userChoices = document.querySelectorAll('.choice-user');

userChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (choices.includes(choice.id)) {
            // get both hands
            const user = choice.id.split("-")[0];
            const computer = getComputerChoice();
            // Play a round
            const currentRound = playRound(user, computer);
            document.getElementById("round-winner").innerHTML = currentRound;
        }
        else {
            console.error("You have 3 options: Rock, paper or Scissors!")
        }
    });
});




// Execute the code
//console.log(game());