/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, previousValueDice = [0,0];
init();

//setter
//document.querySelector('#current-' +  activePlayer).textContent = dice;

//document.querySelector('#current-' +  activePlayer).innerHTML = '<em>' + dice + '</em>';

//getter
//var x = document.querySelector('#score-0').textContent;
//console.log(x);



//Anonymous function - You cannot use this function in any other place but only in this EventListener.
//roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    
    if (gamePlaying){
        //1. Random number
        var dice          = (Math.floor(Math.random()*6)) + 1;
        //previousValueDice = dice;
        
        if (dice === 6 && previousValueDice[activePlayer] === 6){
            console.log('Current player: '+(parseInt(activePlayer)+parseInt(1))); 
            console.log('Value of current dice:'+dice);
            console.log('Value of previous dice:'+previousValueDice);
            console.log('You lose points');
            //lose your points and next player continues
            scores[activePlayer] = 0;
            //document.getElementById('current-'+activePlayer).textContent = '0'; // display the results to 0
            document.getElementById('score-'+activePlayer).textContent   = '0';
            nextPlayer();
            
        }else{
            //2. Display the result
            console.log('Current player: '+(parseInt(activePlayer)+parseInt(1))); 
            console.log('Value of current dice:'+dice);
            console.log('Value of previous dice:'+previousValueDice);
            
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-'+dice + '.png';
            previousValueDice[activePlayer] = dice; //store the previousValueDice for the current player

            //3. Update the round score if the rolled number was not a 1
            if (dice !== 1){
                // Add score
                //roundScore = roundScore + dice;
                roundScore += dice;
                // display the results
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            }else{
                //Next player
                nextPlayer();
            } // end inner most if-else statement
        }// end the middle if-else statement
    }//end outer most if-else statement
});


//save button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add currrent score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();    
        }       
    }
});

function nextPlayer(){
    //ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle does this 
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';    
}

//start a new game
document.querySelector('.btn-new').addEventListener('click', init);

//initiate the new game 
function init(){
    scores       = [0,0];
    roundScore   = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousValueDice = [0,0];
    
    //stop displaying the image of the dice
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent   = '0';
    document.getElementById('score-1').textContent   = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active'); //avoid player 0 to be an active class twice
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/* Challenges

1. A player looses his entire score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable) DONE!
2. Add an input field to the html where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JS.)
3. Add another dice to the game, so that there are 2 dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)




*/