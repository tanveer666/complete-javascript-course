/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * The Plan: create 2 objects player0 and player1 both objects will contains 2 fields, currentScore and globalScore.
 * 
 * Create a general purpose function(player_obj) (which is called on every roll button click) which creates a random number between 1 and 6 and for  1 < number <= 6 it will add number to current score.
 * On every hold button click, it calls the general purpose function with either player0 or player1, and before doing that saves current score as global score.
 */

let player1 = {
    globalScore: 0,
    currentScore: 0,
    playerNo: 1
}

let player2 = {
    globalScore: 0,
    currentScore: 0,
    playerNo: 2
}

let playerSelector = false; //if 0 its player 1 if 1 its player 2 ¯\_(ツ)_/¯

function playerSwap() { //is called when hold is pressed or 1 is rolled.
    // console.log("swapping players?");
    if (!playerSelector) { //when currentPlayer is player 1 when the hold button was pressed.
        player1.globalScore += player1.currentScore; //adds his currentscore to globalscore.
        player1.currentScore = 0; //sets his currentscore to zero in case the method was called by hold button and not 1.
        playerSelector = true; //changes the selector to player2.
        document.querySelector("#score-0").textContent = player1.globalScore; //prints player1's current global score.
        document.querySelector("#current-0").textContent = player1.currentScore; //since player1's turn is over his current score is printed, which is 0
        
        document.querySelector(".player-0-panel").classList.remove("active");
        document.querySelector(".player-1-panel").classList.add("active");
        // console.log(document.querySelector(".player-1-panel").classList);

    }
    else {
        player2.globalScore += player2.currentScore; //this is chosen when player selector was true when swap was called.
        player2.currentScore = 0;
        playerSelector = false;
        document.querySelector("#score-1").textContent = player2.globalScore;
        document.querySelector("#current-1").textContent = player2.currentScore;
        
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.add("active");
        // console.log(document.querySelector(".player-0-panel").classList);


    }

}

function playerSelect() { // Each time roll dice is pressed, this function is called.
    // console.log("selecting player?");
    if (!playerSelector) { //it checks if player selector is true or false. if false player1 is passed.
        rollDice(player1);
    }
    else {
        rollDice(player2); //else player 2 is passed.
    }
}

function rollDice(player) {
    // console.log("rolling dice?");
    let diceRoll = Math.floor((Math.random() * 6)) + 1; //Creates a number between 1-6

    if (diceRoll !== 1) { //As long as the number is not 1,

        player.currentScore += diceRoll; //it adds the random number to the players current score.
        // console.log(player.playerNo+ " rolled "+ diceRoll);

        document.querySelector("#current-" + (player.playerNo - 1)).textContent = player.currentScore; //and shows players current score on page.
        diceDom = document.querySelector(".dice");
        diceDom.style.display = "block";
        diceDom.src = "dice-"+diceRoll+".png"
      
    }
    else {
        player.currentScore = 0; //if 1 is rolled, the current score is set to 0
        document.querySelector("#current-" + (player.playerNo - 1)).textContent = player.currentScore; //and his score is show (which is 0)
        diceDom = document.querySelector(".dice")
        diceDom.src = "dice-"+diceRoll+".png";
        diceDom.style.display = 'block';
        playerSwap(); //then it calls the player swap function to chose the other player.
    }
}

document.querySelector("#current-0").textContent = 0; // Starts all scores as 0.
document.querySelector("#current-1").textContent = 0;
document.querySelector("#score-0").textContent = 0;
document.querySelector("#score-1").textContent = 0;
document.querySelector(".dice").style.display = "none"; //hides the picture
document.querySelector(".btn-hold").addEventListener("click", playerSwap); //event listener for hold button
document.querySelector(".btn-roll").addEventListener("click", playerSelect); //event listener for roll button
document.querySelector(".btn-new").addEventListener("click", function(){ //event listener for new game button.
    console.log("New clicked, time to refresh everything.");
    player1.currentScore = 0;
    player1.globalScore = 0;
    player2.globalScore = 0;
    player2.currentScore = 0;

    //refreshes the content on the page
    document.querySelector("#score-0").textContent = player1.globalScore;
    document.querySelector("#current-0").textContent = player1.currentScore;
    document.querySelector("#score-1").textContent = player2.globalScore;
    document.querySelector(".player-0-panel").classList.add("active");
});


