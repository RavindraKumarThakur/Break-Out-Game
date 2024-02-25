const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#Result');
const blockwidth = 100;
const blockheight = 20;
const boardwidth = 560;
const boardheigth = 300;
let currentPosition = [230,10];
const ballStart = [270,30];
let ballposition = ballStart; 
let timerId;
let score = 0;
const balldiameter = 20;
let xDirection = 2;
let yDirection = 2;

//Block positions
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis + blockwidth,yAxis];
        this.topLeft = [xAxis,yAxis + blockheight];
        this.topRight = [xAxis + blockwidth,yAxis + blockheight];
    }
}

//All blocks
const Blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),    
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),    
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

//Draw all blocks
function addBlocks(){
    for(let i=0;i < Blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = Blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = Blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }

}

addBlocks();

//Adding user to the grid.
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

//Draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

//Move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardwidth - blockwidth){
                currentPosition[0] += 10;
                drawUser(); 
            }
            break;
    }
}

document.addEventListener('keydown',moveUser);

//Adding ball to the grid.
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
ballDraw();

function ballDraw(){
    ball.style.left = ballStart[0] + 'px';
    ball.style.bottom = ballStart[1] + 'px';
}

//Move the ball
function moveBall(){
    ballposition[0] += xDirection;
    ballposition[1] += yDirection;
    ballDraw();
    checkcollision();
}

timerId = setInterval(moveBall,30);

//check for collision
function checkcollision(){
    //check for block collision
    for (let i = 0; i < Blocks.length; i++){
        if
        (
          (ballposition[0] > Blocks[i].bottomLeft[0] && ballposition[0] < Blocks[i].bottomRight[0]) &&
          ((ballposition[1] + balldiameter) > Blocks[i].bottomLeft[1] && ballposition[1] < Blocks[i].topLeft[1]) 
        )
          {
          const allBlocks = Array.from(document.querySelectorAll('.block'))
          allBlocks[i].classList.remove('block')
          Blocks.splice(i,1)
          changeDirection()   
          score++
          scoreDisplay.innerHTML = score
          if (Blocks.length == 0) {
            scoreDisplay.innerHTML = 'You Win!'
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
          }
        }
      }

    //check for user collision
    if
    (
      (ballposition[0] > currentPosition[0] && ballposition[0] < currentPosition[0] + blockwidth) &&
      (ballposition[1] > currentPosition[1] && ballposition[1] < currentPosition[1] + blockheight) 
    )
    {
      changeDirection();
    }

    //check for wall collision.
    if(ballposition[0] >= (boardwidth - balldiameter) ||
    ballposition[1] >= (boardheigth - balldiameter)||
    ballposition[0] <= 0){
        changeDirection();
    }

    //check for game over
    if(ballposition[1] <= 0){
        clearInterval(timerId);
        document.removeEventListener('keydown',moveUser);
        scoreDisplay.textContent = 'You Lose!!!';
    }

}

//change ball direction
function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }

