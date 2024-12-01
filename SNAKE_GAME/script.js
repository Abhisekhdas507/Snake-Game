// Game Constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 10, y: 15 }
];

// Getting random food location
let a = 2;
let b = 18;
let food = { x: Math.round(Math.random() * (b - a) + a), y: Math.round(Math.random() * (b - a) + a) }

let foodRed = true;



// Game Functions
// ctime means current time
function main(ctime) {
    window.requestAnimationFrame(main);
    // window.requestAnimationFrame(main) was called
    
    console.log(ctime);

    // to controling fps for screen paint
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If Snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if snake bump into wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}


function gameEngine() {
    // Part 1: updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If snake eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
    
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "High Score " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 18;
        food = { x: Math.round(Math.random() * (b - a) + a), y: Math.round(Math.random() * (b - a) + a) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
        // ... step done because of referencing problem

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake and Food

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }

        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    if(score%2 == 0)
    {
        foodElement.classList.add('foodRed');
    }
    else
    {
        foodElement.classList.add('foodGreen');
    }
    
    board.appendChild(foodElement);

}


// Main logic starts here

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "High Score " + hiscore;
}

// what is request animation frame main
// ya ek bar main ko fire kreaga
window.requestAnimationFrame(main);
// window.requestAnimationFrame(main) this function call the main function
window.addEventListener('keydown', (e) => {

    musicSound.play();
    inputDir = { x: 0, y: 1 } // Start the game;
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "w":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "s":
            
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "d":
            ;
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "a":
            
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

