//variables
//get object canvas
let canvas = document.getElementById("snake");
let context = canvas.getContext('2d');

//for count pixels
let box = 32;

//array for "snake"
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//for aleatory move
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//satrt direction
let direction = "right";


//initial functions

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "#8B4513";
        context.fillRect(snake[0].x, snake[0].y, box, box);
        //change color snake
        if (snake.length >= 2) {
            context.fillStyle = "#006400";
            context.fillRect(snake[i].x, snake[i].y, box, box);

            context.fillStyle = "#CD853F";
            context.fillRect(snake[snake.length - 1].x, snake[snake.length - 1].y, box, box);
        }
    }

}

function createFood() {
    context.fillStyle = "#800080";
    context.fillRect(food.x, food.y, box, box)
}
//wait key press
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}


function startGame() {
    //for bugs
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert("Game Over");
        }
    }

    //  calling functions      
    createBG();
    createSnake();
    createFood();

    //move snake    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;

    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
            food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    //New Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}
//game timer
let game = setInterval(startGame, 200);

startGame();