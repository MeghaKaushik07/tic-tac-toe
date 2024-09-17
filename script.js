const cells = document.querySelectorAll('[cell-1]');
const turnInfo = document.getElementById('m1');
const timerDisplay = document.getElementById('timer');
let currentPlayer = 'X'; 
let timeLeft = 5; 
let gameActive = true; 
let timer; 


turnInfo.innerHTML = "Player 1's turn (X)";


startTimer();


function startTimer() {
    timeLeft = 5;
    timerDisplay.innerHTML = `0:0${timeLeft}`; 

    timer = setInterval(() => {
        timeLeft--; 

       
        if (timeLeft < 10) {
            timerDisplay.innerHTML = `0:0${timeLeft}`;
        } else {
            timerDisplay.inner = `0:${timeLeft}`;
        }

        
        if (timeLeft <= 0) {
            switchPlayer(); 
        }
    }, 1000); 
}


cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true }); 
});

function handleClick(e) {
    const cell = e.target; 

   
    if (gameActive && cell.textContent === '') { 
        placeMark(cell, currentPlayer); 

       
        if (checkWin(currentPlayer)) {
            endGame(false); 
        } 
        
        else if (isDraw()) {
            endGame(true); 
        } 
       
        else {
            switchPlayer();
        }
    }
}


function placeMark(cell, player) {
    cell.innerHTML = player; 
}


function switchPlayer() {
    
    clearInterval(timer);

    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

   
    turnInfo.innerHTML = currentPlayer === 'X' ? "Player 1's turn (X)" : "Player 2's turn (O)";

    
    startTimer();
}


function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]              
    ];

    return winPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].innerHTML === player; 
        });
    });
}


function isDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML === 'X' || cell.innerHTML === 'O'; 
    });
}


function endGame(draw) {
    gameActive = false; 
    clearInterval(timer); 

    if (draw) {
        turnInfo.innerHTML = "It's a Draw!";
    } else {
        turnInfo.innerHTML = `Player ${currentPlayer === 'X' ? '1' : '2'} Wins!`;
    }
}
