export function drawBall(ctx,x,y, ballRadius = 5){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius, 0,Math.PI *2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}


const $sprite = document.querySelector('#sprite');
export function drawPaddle(ctx, paddleX, paddleY, paddleWith, paddleHeight){
    ctx.drawImage(
        $sprite,
        29,
        174,
        paddleWith,
        paddleHeight,
        paddleX,
        paddleY,
        paddleWith,
        paddleHeight
    )
}


