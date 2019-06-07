
// /*                START GAME FUNCTION with SPACE and COUNTDOWN TIMER        */

const keyCodeEnter = 13
// //////////////////////////////////////////////////

// //------------------Variables for the canvas-----------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

//-----------------Variables for the rocket------------------

let rocketHeight = 30;
let rocketWidth = 30;
let rocketX = (canvas.width-rocketWidth) / 2;
let rocketY = canvas.height - (rocketHeight + 40);

//----------------Variables for the left and right keys pressed--------

let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

//---------------Variables fo the bullet--------------

let ball = {};

//----------------Draws the rocket-----------------------


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

function createBall () {
    ball = {x : rocketX + 15, y : 300 }
 }
 
 function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    // if (spacePressed) {
    //     console.log("bullet working")
    // }
 }

//-----------------------functions for when we press the keys-------------

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
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }    
}




//----------------initialise the game--------boosh

///////////////////////////JADE ALIENS//////////////////

// let canvas = document.getElementById("myCanvas");
// let ctx = canvas.getContext("2d");

// let x = canvas.width/2;
// let y = canvas.height-30;
// let dx = 2;
// let dy = -2;





let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
   bricks[c] = [];
   for(let r=0; r<brickRowCount; r++) {
       bricks[c][r] = { x: 0, y: 0 };
   }
}

function drawBricks() {
   for(let c=0; c<brickColumnCount; c++) {
       for(let r=0; r<brickRowCount; r++) {
           let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
           let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
           bricks[c][r].x = brickX;
           bricks[c][r].y = brickY;
           ctx.beginPath();
           ctx.rect(brickX, brickY, brickWidth, brickHeight);
           ctx.fillStyle = "#FF0000";
           ctx.fill();
           ctx.closePath();


       }
   }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawRocket();

    drawBricks();

    drawBall();
    ball.y -= 10;

    collisionDetection();


    if(rightPressed && rocketX < canvas.width-rocketWidth) {
        rocketX += 1;
    }
    else if(leftPressed && rocketX > 0) {
        rocketX -= 1;
    }
    else if(spacePressed) {
        // console.log("Spacebar working")
    }


    x += dx;
    y += dy;
    
    }

function draw2() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   drawBricks();
   x += dx;
   y += dy;
   ///////////////
    
    
}


document.body.onkeyup = function (e) {
    if (e.keyCode == keyCodeEnter) { 
        draw2()
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
//  let interval = 
