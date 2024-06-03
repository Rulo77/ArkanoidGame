
let rightPressed = false;
let leftPressed = false;

export function initEvents(){
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);


    function keyDownHandler(event){
        const {key} = event;
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = true
        }else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true
        }
    }

    
    function keyUpHandler(event){
        const {key} = event;
        if(key === 'Right' || key === 'ArrowRight'){
            rightPressed = false
        }else if(key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false
        }
    }
}

export function paddleMovement(canvas,paddleX,paddleWith){
    if(rightPressed && paddleX < canvas.width - paddleWith - 5){
        paddleX += 7
    }else if(leftPressed && paddleX > 5){
        paddleX -= 7
    }

    return paddleX;
}


