import { drawBall, drawPaddle} from './draw.js';
import { initEvents, paddleMovement} from './movements.js';
//recuperamos la etiqueta canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 680;

const paddleHeight = 10;
const paddleWith = 50;

let paddleX = (canvas.width - paddleWith) / 2;
const paddleY = canvas.height - paddleHeight - 15;
console.log(paddleY)
let x = canvas.width / 2;
let y = canvas.height - 30;

//variables de la pelota(ball)
const ballRadius = 5;
//velocidad de la pelota
let dx = 2;
let dy = -2;

export function ballMovement() {
    //rebotar las pelotas en los laterales
    if (
        x + dx > canvas.width - ballRadius ||
        x + dx < ballRadius
    ) {
        dx = -dx;
    }

    //rebotar en la parte superior
    if (y + dy < ballRadius) {
        dy = -dy;
    }

    const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWith;

    const isBallTouchingPaddle = y + dy > paddleY

    if (isBallSameXAsPaddle && isBallTouchingPaddle) {
        dy = -dy
    }
    else if((y + dy) > (canvas.height - ballRadius)) {

        console.log("Game over");
       document.location.reload();
       return false
    }

    x += dx;
    y += dy;

}

const $bricks = document.querySelector('#bricks');
//variables de los ladrillos
 const brickRowCount = 10;
 const brickColumnCount = 13;
 const brickWidth = 32;
 const brickHeigth = 16;
 const brickPadding = 0;
 const brickOffsetTop = 80;
 const brickOffsetLeft = 19;
 const bricks = [];

 const BRICK_STATUS = {
     ACTIVE: 1,
     DESTROYED: 0
 }

 for(let c= 0; c < brickColumnCount; c++){
     bricks[c] = []
     for (let r = 0; r < brickRowCount; r++) {
         const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
         const brickY = r * (brickHeigth + brickPadding) + brickOffsetTop;

         const random = Math.floor(Math.random()*8);
         bricks[c][r]= {x:brickX, y:brickY, status: BRICK_STATUS.ACTIVE, color:random}
     }
 }

function drawBricks(){
 for(let c= 0; c < brickColumnCount; c++){
     for (let r = 0; r < brickRowCount; r++) {
         const currentBrick = bricks[c][r];
         if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;

         const clipX = currentBrick.color * 32;

         ctx.drawImage(
             $bricks,
             clipX,
             0,
             brickWidth,
             brickHeigth,
             currentBrick.x,
             currentBrick.y,
             brickWidth,
             brickHeigth
         )
     }
 }

}


function collitionDetectionBrick(){
    for(let c= 0; c < brickColumnCount; c++){
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;

            const isBallSameXAsBrick = x > currentBrick.x && x < currentBrick.x + brickWidth;
            const isBallSameYAsBrick = y >currentBrick.y && y < currentBrick.y + brickHeigth;

            if(isBallSameXAsBrick && isBallSameYAsBrick){
                currentBrick.status = BRICK_STATUS.DESTROYED;
                dy = -dy;
            }
        }
    }
}




function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    cleanCanvas();
    //dibujar elementos
    drawBall(ctx, x, y, ballRadius);
    drawPaddle(ctx, paddleX, paddleY, paddleWith, paddleHeight);
    drawBricks();

    //colisiones y movimientos
    collitionDetectionBrick();
    ballMovement();
    paddleX = paddleMovement(canvas, paddleX, paddleWith);

    window.requestAnimationFrame(draw);
}

draw();
initEvents();
