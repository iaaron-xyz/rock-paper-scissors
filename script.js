// Options and record
const choices = ["rock", "paper", "scissors"];
let record = {"user": 0, "computer": 0};


// Ask the user choice
function getUserChoice() {
    // Ask and get the user choice
    let choice = prompt("Rock, paper or scissors?").toLowerCase();
    // Check user option exist
    if (choices.includes(choice)) {
        return choice;
    }
    else {
        console.error("You must choose rock, paper or scissors!");
    }
}
// Get computer choice
function getComputerChoice() {
    // Choose randomly a value among those options
    return chooseArrayItem(choices)
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


// Execute the code
console.log(game());