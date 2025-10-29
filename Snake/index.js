const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");//ctx is the content
const score = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "skyblue";
const snakeColor = "purple";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25//the size of everything in the game
let running = false;
let xVelocity =  unitSize;//how far we move the snake along the x axis
let yVelocity = -unitSize;
//to move up we set the uzitSize to the neg
let foodX;
let foodY;

let snake = [
    {x: unitSize * 4, y:0},
    //to get the size of the snake body increasing as it eats the food 
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},
    {x: unitSize, y:0},
    {x: 0, y:0}
    //for the body of the snake set the tail to 0 to be at the top left

  ];
document.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
//resetBtn to start the game to invoke the resetGame() and the game starts
//the functions invokation
gameStart();


function gameStart(){
    clearBoard();
    running = true;
    score.textContent = 0;
    createFood();
    drawFood();
    nextTick ();
    
};
function nextTick (){//the next tick is for resetting the position of the food as the game starts
   if (running){
    setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick()
    }, 250);
   }else{
        displayGameOver();
   }
};
function clearBoard (){//clear board for repeating the board for the game start.
    ctx.fillStyle = boardBackground;
    ctx.fillRect (0, 0, gameWidth, gameHeight);
};

function createFood(){
    
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min)/ unitSize) * unitSize;
        //divide by the unitsize to divide the space into two spaces
        //multiply by the unitsize to put the food at the top left corner.
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    //the random number is between 0 and gamewidht - unitsize.
    foodY = randomFood(0, gameHeight - unitSize);
    //console.log(foodX);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);//to fill the rectangle of the food
};//for setting the position of the food width and height being both the unitsize.
function moveSnake(){
    const head = { x: snake[0].x + xVelocity,//the xvleocity for the x axis distance
                   y: snake[0].y + yVelocity };//the yvelocity for the y axis distance

                  console.log("Moving snake to:", head);

    snake.unshift(head);//adding the food on the snake as it eats
              //if the food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        //if the coordinates of the snake current position meets with that of the food add the score by 1
        let currentScore = parseInt(score.textContent);

        currentScore += 1;
        score.textContent = currentScore;
        createFood();

    }else {
        snake.pop();
        //to eliminate the tail after each move.

    }            
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })
};
function changeDirection(event){//the function is to be invoked as long as we press the key

    console.log("Key pressed:", event.keyCode);
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true){
      case(keyPressed == LEFT && !goingRight):
        //not to the right because the snake can't reverse and go in right position.
        xVelocity = -unitSize;//for going in the left
        yVelocity = 0;//to not go up or down;
        break;

      case(keyPressed == UP && !goingDown):
        //not to the right because the snake can't reverse and go in right position.
        yVelocity = -unitSize;//for going up only
        xVelocity = 0;//to not go left or right;
        break;

      case(keyPressed == RIGHT && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;

      case(keyPressed == DOWN && !goingUp):
        xVelocity = 0;  
        yVelocity = unitSize;
        break;

    }

};
function checkGameOver(){

    if (!running) {
        displayGameOver();
    }
    switch(true){
        case (snake[0].x < 0)://means going out of the left border.
            running = false;
            break;

        case (snake[0].x >= gameWidth)://going out of the right border.
            running = false;
            break;

        case (snake[0].y < 0)://going out of the top border;
            running = false;
            break;

        case (snake[0].y >= gameHeight)://going over the bottom border
            running =false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){//loops for every snakepart and not the head only
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
        //if the xcordinate of any part meats another one the game is over the same for the ycordinates

    }
};
function displayGameOver(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", gameWidth / 2, gameHeight/2);
    running = false;

};
function resetGame(){
    running = true;
    score.textContent = 0;
    xVelocity = unitSize;
    yVelocity = 0;

    snake = [
        {x: unitSize * 4, y:0},
        {x: unitSize * 3, y:0},
        {x: unitSize * 2, y:0},
        {x: unitSize, y:0},
        {x: 0, y:0}    
      ];
      gameStart();
};
