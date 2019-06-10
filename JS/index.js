
// /*        START GAME FUNCTION with SPACE and COUNTDOWN TIMER    */
const keyCodeEnter = 13
// //////////////////////////////////////////////////
// //------------------Variables for the canvas-----------
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let time = 0;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let z = 0.1;
let q = 0;
let sz = 0;
//-----------------Variables for the rocket------------------
let rocketHeight = 30;
let rocketWidth = 30;
let rocketX = (canvas.width-rocketWidth) / 2;
let rocketY = canvas.height - (rocketHeight + 40);
//----------------Variables for the left and right keys pressed--------
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
//---------------Variables fo the bullet(ball)--------------
let ball = {};
let balls= [];
//creataes the array of bricks...
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(let r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
//functions for if a key is pressed down and when the key is not pressed...
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
    
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
    
  }
  else if(e.keyCode == 32) {
    spacePressed = true
    
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  else if (e.keyCode == 32) {
    spacePressed = false;
  }
}
//function to detect when the ball meets
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      
      let b = bricks[c][r];
      balls.forEach(function (e) {
        if (b.status == 1) {
        
          if (e.x > b.x && e.x < b.x + brickWidth && e.y - 20 > b.y && e.y - 20 < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            balls.pop();
            
          }
        }
      })
      
    }
  }
}
//creates the bullet 
function createBall () {
  if(time === 0 || time > 30) {
  ball = {x : rocketX + 15, y : 300, status:1};
  balls.unshift(ball);
    time = 0
  //console.log(balls)
  }
}
 
//Makes the ball dissappear when in contact with a brick or goes of the screen (ball = bullet)
function destroyBall () {
  balls.forEach(function(e) {
    if(e.y === 0) {
      balls.pop();
    }
  })
}
 function drawBall() {
  
  balls.forEach(function(e) {
  ctx.beginPath();
  ctx.arc(e.x, e.y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  })
  
  // if (spacePressed) {
  //   console.log("bullet working")
  //  }
}
//Creates the ship that the user will use and abuse
function drawRocket() {
  ctx.beginPath();
  ctx.rect(rocketX, canvas.height-rocketHeight, rocketWidth, rocketHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  if(rightPressed) {
    rocketX += 1;
  }
  else if(leftPressed) {
    rocketX -= 1;
  }
  if(rightPressed && rocketX < canvas.width - rocketWidth) {
    rocketX += 1;
  }
  else if(leftPressed && rocketX > 0) {
    rocketX -= 1;
  }
  else if(spacePressed) {
    createBall();
  }  
}
//Function to draw the bricks 
function drawBricks() {
  for(let c=0; c<brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status ==1) {
        
             
        
        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft + sz;
        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop + q;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        if(brickX + brickWidth > 480 || brickX <0) {
          q += 1;
          z =-z;
        }
        sz += z
    
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}
function draw() {
  time+= 1
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRocket();
  drawBricks(); 
  drawBall();
  destroyBall();
  collisionDetection();
  //console.log(bricks)
  balls.forEach(function(e){
    e.y -= 10;
  })
  
  
  if(rightPressed && rocketX < canvas.width-rocketWidth) {
    rocketX += 1;
  }
  else if(leftPressed && rocketX > 0) {
    rocketX -= 1;
  }
  else if(spacePressed) {
    // console.log("Spacebar working")
  }
  // x += dx;
  //y += dy;
}
  
document.body.onkeyup = function (e) {
  if (e.keyCode == keyCodeEnter) { 
    draw()
    // setInterval(draw2, 10);
    
    function countdown() {
      
      let i = document.getElementById('timer');
      i.innerHTML = parseInt(i.innerHTML)-1;
      if (parseInt(i.innerHTML)==0) {
        clearInterval(timerId);
        document.getElementById('time-alert').innerHTML='Game over'
      }  
    }
     let timerId = setInterval(function(){ countdown(); },1000);
     
     setInterval(draw, 10);
  }
  
}
