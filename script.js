/*********************************************************
 * DOM MANIPULATION
 */

// Options and record
const choices = ["rock-user", "paper-user", "scissors-user"];
let record = {"user": 0, "computer": 0};

const userChoices = document.querySelectorAll('.choice-user');
const computerScore = document.getElementById('computer-score');
const userScore = document.getElementById('user-score');
const roundWinner = document.getElementById('round-winner');

// Get the modal
const modal = document.getElementById("my-modal");
const finalResult = document.querySelector(".final-result");
const playAgain = document.querySelector(".play-again");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Main function
userChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (choices.includes(choice.id)) {
            // user choice
            const user = choice.id.split("-")[0];
            // computer choice
            const computer = getComputerChoice();
            // Play a round 
            const currentWinner = playRound(user, computer);
            // Display the winner of the current round
            document.getElementById("round-winner").innerHTML = currentWinner[0];
            // Udate score
            updateScore(currentWinner[1]);
            
            // Colors to the winner and the loser
            if (currentWinner[1] == "user") {
                document.querySelector(`#${user}-user`).classList.add("winner-choice");
                document.querySelector(`#${computer}-computer`).classList.add("loser-choice");
                // color the number of pints
                document.querySelector(`#user-${record.user}`).classList.add("green-point");
            }
            else if (currentWinner[1] == "computer") {
                document.querySelector(`#${user}-user`).classList.add("loser-choice");
                document.querySelector(`#${computer}-computer`).classList.add("winner-choice");
                // color the number of pints
                document.querySelector(`#computer-${record.computer}`).classList.add("green-point");
            }
            else {
                document.querySelector(`#${user}-user`).classList.add("tie-choice");
                document.querySelector(`#${computer}-computer`).classList.add("tie-choice");
            }
            
            // After S seconds remove the winner and loser classes
            setTimeout(function(){
                if (currentWinner[1] == "user") {
                    document.querySelector(`#${user}-user`).classList.remove("winner-choice");
                    document.querySelector(`#${computer}-computer`).classList.remove("loser-choice");
                }
                else if (currentWinner[1] == "computer") {
                    document.querySelector(`#${user}-user`).classList.remove("loser-choice");
                    document.querySelector(`#${computer}-computer`).classList.remove("winner-choice");
                }
                else {
                    document.querySelector(`#${user}-user`).classList.remove("tie-choice");
                    document.querySelector(`#${computer}-computer`).classList.remove("tie-choice");
                }
            }, 1500);
        }

        // Actavate modal window of a finished game
        if (record.user >= 5 || record.computer >= 5) {
            if (record.user > record.computer) {
                finalResult.innerHTML = "You WON! :D";
            }
            else {
                finalResult.innerHTML = "You LOST! D:"
            }
            modal.style.display = "block";
        }

        else {
            console.error("You have 3 options: Rock, paper or Scissors!");
        }
    });
});

// Restart the game
playAgain.addEventListener('click', restarGame);

// Hide modal
span.addEventListener('click', () => {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        restarGame();
    }
}


/*********************************************************
 * FUNCTION DECLARATIONS
 */

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
            return ["Tie", "Tie"]
        }
        else if (computerChoice == "paper") {
            record.computer += 1;
            return [`${computerChoice} beats ${playerChoice}. Computer wins this round!`, "computer"]
        }
        else {
            record.user += 1;
            return [`${playerChoice} beats ${computerChoice}. You win this round!`, "user"]
        }
    }
    // User Choose PAPER
    if (playerChoice == "paper") {
        if (computerChoice == "rock") {
            record.user += 1;
            return [`${playerChoice} beats ${computerChoice}. You win this round!`, "user"]
        }
        else if (computerChoice == "paper") {
            return ["Tie", "Tie"]
        }
        else {
            record.computer += 1;
            return [`${computerChoice} beats ${playerChoice}. Computer wins this round!`, "computer"]
        }
    }
    // User Choose SCISSORS
    if (playerChoice == "scissors") {
        if (computerChoice == "rock") {
            record.computer += 1;
            return [`${computerChoice} beats ${playerChoice}. Computer wins this round!`, "computer"]
        }
        else if (computerChoice == "paper") {
            record.user += 1;
            return [`${playerChoice} beats ${computerChoice}. You win this round!`, "user"]
        }
        else {
            return ["Tie", "Tie"]
        }
    }
}
// update score
function updateScore(roundWinner) {
    if (roundWinner == "user") {
        document.getElementById(`${roundWinner}-score`).innerHTML = `Score <br> ${record.user}`;
    }
    else if (roundWinner == "computer") {
        document.getElementById(`${roundWinner}-score`).innerHTML = `Score <br> ${record.computer}`;
    }
}

// Restart Game
function restarGame() {
        // Restart the Variables
        record.user = 0;
        record.computer = 0;
        
        // DOM modification
        // Score
        computerScore.innerHTML = "Score <br> 0";
        userScore.innerHTML = "Score <br> 0";
        // text announcement
        roundWinner.innerHTML = "Are you ready fot another GAME?!";
    
        // Remove the green (victory) points
        for (let i = 1; i < 6; i++) {
            document.querySelector(`#user-${i}`).classList.remove("green-point");
            document.querySelector(`#computer-${i}`).classList.remove("green-point");
        }
        // Hide modal
        modal.style.display = "none";
}


// HELPER FUNCTIONS
// Choose an array element randomly
function chooseArrayItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}