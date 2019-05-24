/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

/***
 * My rules, if either one of the dice is 1 or if both dice are 6 all scores are lost!
 */

let player0 = new Object();
let player1 = new Object();
let playerSelect;
let gameState;
let maxPoints; //set to undefined at first.
/*** create eventHandlers. */
document.querySelector(".btn-new").addEventListener("click", init);
document.querySelector(".btn-roll").addEventListener("click", rollDice);
document.querySelector(".btn-hold").addEventListener("click", hold);

//on change to the maxScore element, maxPoints gets initialzed with the inpu value and also the input field is disabled for further tampering
//The game will not start untill there is a value provided in the input field. As when the rollDice function is called on each dice roll,
// It checks the value of maxPoints, which if still undefined because no value was input, means game will not procede.
let maxScoreElement = document.querySelector("#maxScore");

maxScoreElement.addEventListener("change", function() {
  maxPoints = maxScoreElement.value;
  maxScoreElement.disabled = true;
  console.log(maxPoints);
});

//initialize (also refreshes) all the values.
init();
function init() {
  /*** Initializing the player variables. */
  playerSelect = 0;
  player0.globalScore = 0;
  player0.currentScore = 0;
  player0.playerName = 0;

  player1.currentScore = 0;
  player1.globalScore = 0;
  player1.playerName = 1;

  /*** Initializing the look of the webpage */
  //values set to 0
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#current-0").textContent = 0;

  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  //Hide the dice
  document.querySelector("#dice1").style.display = "none";
  document.querySelector("#dice2").style.display = "none";

  //Sets the input field as active again and refreshes the value.
  maxScoreElement.disabled = false;
  maxScoreElement.value = 0;

  //remove all active and winner classes, set player 0 as activge again.
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
}

function updatePageData(playerNo, playerObj) {
  document.querySelector("#score-" + playerNo).textContent =
    playerObj.globalScore;
  document.querySelector("#current-" + playerNo).textContent =
    playerObj.currentScore;
}

function setActive() {
  //sets active if it was not, removes active if it was.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function hold() {
  diceDom = document.querySelector("#dice1");
  diceDom2 = document.querySelector("#dice2");

  if (playerSelect === 1) {
    player1.globalScore += player1.currentScore;
    player1.currentScore = 0;
    updatePageData(playerSelect, player1);
    diceDom.style.display = "none";
    diceDom2.style.display = "none";
    if (player1.globalScore >= maxPoints) winner(playerSelect);
    //if the player is winner, make him winner, otherwise change the active player.
    else {
      playerSelect = 0; //changes the active player as this is the main purpose of hold button.
      setActive();
    }
  } else if (playerSelect === 0) {
    player0.globalScore += player0.currentScore;
    player0.currentScore = 0;
    updatePageData(playerSelect, player0);
    diceDom.style.display = "none";
    diceDom2.style.display = "none";

    if (player0.globalScore >= maxPoints)
      //if the player is winner, calls the winner function, otherwise changes the active player.
      winner(playerSelect);
    else {
      playerSelect = 1;
      setActive();
    }
  }
}

function rollDice() {
  //this function only does something if playerSelect is either 1 or 0, anyother value and the function will not execute anything.
  if (playerSelect === 1 && maxPoints) rollDiceAction(player1);
  else if (playerSelect === 0 && maxPoints) rollDiceAction(player0);
}

function rollDiceAction(player) {
  let diceRoll = Math.floor(Math.random() * 6) + 1; //Creates a number between 1-6
  let diceRoll2 = Math.floor(Math.random() * 6) + 1;
  diceDom = document.querySelector("#dice1");
  diceDom.src = "dice-" + diceRoll + ".png"; //changes the dice pic and shows it on screen.
  diceDom.style.display = "block";

  diceDom2 = document.querySelector("#dice2");
  diceDom2.src = "dice-" + diceRoll2 + ".png";
  diceDom2.style.display = "block";

  console.log(diceRoll,diceRoll2);

  if ((diceRoll !== 1 && diceRoll2 !== 1) &&
      (diceRoll !== 6 || diceRoll2 !== 6)) {
    player.currentScore += (diceRoll + diceRoll2);
    updatePageData(playerSelect, player);
  } else {
    player.currentScore = 0;
    diceDom.style.display = "none";
    hold();
  }
}

function winner(playerNo) {
  playerSelect = 100; //rollDice expects only values 0 and 1, so any other value except those 2 would work here.
  document
    .querySelector(".player-" + playerNo + "-panel")
    .classList.add("winner");
  document.querySelector("#name-" + playerNo).textContent = "winner!";

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
