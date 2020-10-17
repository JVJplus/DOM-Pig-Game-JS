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

var score = [];
var isPreviousHadSix = false;
var currentPlayer, currentScore;
var isPlaying = true;
var winningScore = 20;

function init() {
    isPlaying = true;

    score[0] = 0;
    score[1] = 0;
    currentPlayer = 0;
    currentScore = 0;
    winningScore=parseInt(document.querySelector('.final-score').value);
    if(!winningScore) 
        winningScore=20;
    // console.log(winningScore);

    document.querySelector("#dice-0").style.display = "none";
    document.querySelector("#dice-1").style.display = "none";

    var score0DOM = document.querySelector("#score-0");
    var score1DOM = document.querySelector("#score-1");
    score0DOM.textContent = "0";
    score1DOM.textContent = "0";

    var current0DOM = document.querySelector("#current-0");
    var current1DOM = document.querySelector("#current-1");
    current0DOM.textContent = "0";
    current1DOM.textContent = "0";

    var player0DOM = document.querySelector(".player-" + 0 + "-panel");
    player0DOM.classList.add("active");
    player0DOM.classList.remove("winner");
    var player1DOM = document.querySelector(".player-" + 1 + "-panel");
    player1DOM.classList.remove("active");
    player1DOM.classList.remove("winner");

    var player0DOMtext = document.querySelector(
        ".player-" + 0 + "-panel .player-name"
    );
    var player1DOMtext = document.querySelector(
        ".player-" + 1 + "-panel .player-name"
    );
    player0DOMtext.textContent = "PLAYER 1";
    player1DOMtext.textContent = "PLAYER 2";
}

function gotTheWinner() {
    var playerDOM = document.querySelector(
        ".player-" + currentPlayer + "-panel"
    );
    playerDOM.classList.add("winner");

    var playerDOMtext = document.querySelector(
        ".player-" + currentPlayer + "-panel .player-name"
    );
    playerDOMtext.textContent = "WINNER!";
}

function hold() {
    if (!isPlaying) return;

    // update score
    var scoreDOM = document.querySelector("#score-" + currentPlayer);
    score[currentPlayer] += currentScore;
    scoreDOM.textContent = score[currentPlayer];

    var currentDOM = document.querySelector("#current-" + currentPlayer);
    currentDOM.textContent = 0;

    var oldPlayerDOM = document.querySelector(
        ".player-" + currentPlayer + "-panel"
    );
    oldPlayerDOM.classList.remove("active");

    if (score[currentPlayer] >= winningScore) {
        gotTheWinner();
        isPlaying = false;
        return;
    }

    currentScore = 0;
    currentPlayer = 1 - currentPlayer;

    var newPlayerDOM = document.querySelector(
        ".player-" + currentPlayer + "-panel"
    );
    newPlayerDOM.classList.add("active");
    isPreviousHadSix=false;
}

function roll() {
    if (!isPlaying) return;

    var randomNo0 = Math.floor(Math.random() * 6) + 1;
    var randomNo1= Math.floor(Math.random() * 6) + 1;
    currentScore += randomNo0+randomNo1;
    document.querySelector("#dice-0").style.display = "block";
    document.querySelector("#dice-0").src = "dice-" + randomNo0 + ".png";
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-1").src = "dice-" + randomNo1 + ".png";

    document.querySelector("#current-" + currentPlayer).textContent = currentScore;

    // console.log(currentPlayer,":",randomNo0,randomNo1);

    if (randomNo0 == 1 || randomNo1 == 1) {
        currentScore = 0;
        hold();
        return;
    }

    if(randomNo0==6 || randomNo1==6){
        if(isPreviousHadSix){
            score[currentPlayer]=0;
            currentScore=0;
            hold();
            return;
        }
        isPreviousHadSix=true;
    }
}

function newGame() {
    main();
}

function manageEvents() {
    // Roll Dice
    var rollDOM = document.querySelector(".btn-roll");
    rollDOM.addEventListener("click", roll);

    // Hold
    var holdDOM = document.querySelector(".btn-hold");
    holdDOM.addEventListener("click", hold);

    // New Game
    var newGameDOM = document.querySelector(".btn-new");
    newGameDOM.addEventListener("click", newGame);
}

function main() {
    init();
    manageEvents();
}

main();
