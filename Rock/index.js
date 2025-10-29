const choices = ["rock", "paper", "scissors"];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

function playGame(playerChoice){
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    //this returns a number between 0 and 2 for the choice index and the * 3
    //and it again rounds it down
    //console.log(computerChoice);
    let result = "";
    if(playerChoice == computerChoice){
        result = "IT'S A TIE";
    }else{
        switch(playerChoice){
            case "rock":
               result = (computerChoice === "scissors") ? "YOU WIN 🎉💪!!" : "YOU LOSE! 😔😥";
            //    if the pc plays scissors then it won else it means pc choose the paper
               break;
        
            case "paper":
               result = (computerChoice === "rock") ? "YOU WIN 🎉💪!!" : "YOU LOSE! 😔😥";
               break;

            case "scissors":
                result = (computerChoice === "paper") ? "YOU WIN 🎉💪!!" : "YOU LOSE! 😔😥";
                break;
               
            }
    }

    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    resultDisplay.classList.remove("greenText", "redText");
    // to remove the green and the red text before the game starts

    switch(result){
        case "YOU WIN 🎉💪!!":
            resultDisplay.classList.add("greenText")//add the css class greenText to the resultDisplay;
            break;

        case "YOU LOSE! 😔😥":
            resultDisplay.classList.add("redText");   
            break; 
    };

}

