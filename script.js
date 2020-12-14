var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var paddleH = 10;
var paddleW = 75;
var paddleX = (canvas.width - paddleW) / 2;
var dx = 2;
var dy = -2;

var rightPress = false;
var leftPress = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0 };
    }
}

function myBrick() {
    for (var k = 0; k < brickColumnCount; k++) {
        for (var l = 0; l < brickRowCount; l++) {
            var brickX = (k * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (l * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[k][l].x = brickX;
            bricks[k][l].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();

        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPress = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPress = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = false;
    }
}

function myBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function myPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function bounce() {
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleW + paddleX) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
}

function paddleMove() {
    if (rightPress) {
        paddleX += 5;
        if (paddleX + paddleW > canvas.width) {
            paddleX = canvas.width - paddleW;
        }
    } else if (leftPress) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myBrick();
    myBall();
    myPaddle();
    bounce();
    x += dx;
    y += dy;
    paddleMove();
}

var interval = setInterval(draw, 10);