const playBoard = document.querySelector('.play-board');
let scoreElement = document.querySelector('.score');
let highScoreElement = document.querySelector('.high-score');




let foodX, foodY;
let snakeX, snakeY;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameOver = false;

let setIntervalid;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

// Mostrar la fruta en una posicion ramdom
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}


// Mostrar la serpiente en una posicion ramdom
const changeSnakePosition = () => {
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
}


// Si perdemos el juego, alerta y se reinicia
const handleGameOver = () => {
    clearInterval(setIntervalid);
    alert("Game Over!");
    location.reload();
}


// Manejar la serpiente
const changeDirection = (e) => {
    // console.log(e);
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === 'ArrowDown'  && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === 'ArrowLeft'  && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === 'ArrowRight'  && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    initGame();
}


const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    // cambiar posicion fruta y hacer crecer la serpiente

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);
        scoreElement.innerHTML = `Score: ${score}`;

        highScoreElement.innerHTML = 
        `High Score: ${highScore}`;
    }

    // finalizar juego
    if (snakeX <= 0 ||  snakeX >= 30 || snakeY <= 0 || snakeY >= 30) {
        gameOver = true;
    }

    if (gameOver) return handleGameOver();



    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0]  === snakeBody[i][0]) {
            gameOver = true;
        }
            
    }

    
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
changeSnakePosition();
// initGame();
setIntervalid = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection);


