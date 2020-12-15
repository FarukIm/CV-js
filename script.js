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

var score = 0;

var rightPress = false;
var leftPress = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


function reset() {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = canvas.width / 2;
    y = canvas.height - 30;
    ballRadius = 10;
    paddleH = 10;
    paddleW = 75;
    paddleX = (canvas.width - paddleW) / 2;
    dx = 2;
    dy = -2;

    score = 0;

    rightPress = false;
    leftPress = false;

    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var d = 0; d < brickRowCount; d++) {
            bricks[c][d] = { x: 0, y: 0, status: true };
        }
    }
    interval = setInterval(draw, 10);
}

var bricks = [];
for (var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: true };
    }
}

function myBrick() {
    for (var k = 0; k < brickColumnCount; k++) {
        for (var l = 0; l < brickRowCount; l++) {
            if (bricks[k][l].status == true) {
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
}

function myScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20);
}

function victory() {
    dx = 0;
    dy = 0;
    ctx.font = "30px bold Arial";
    ctx.fillStyle = "black";
    ctx.fillText("You won!", canvas.width / 2 - 70, canvas.height / 2);
    clearInterval(interval);
}

function loss() {
    dx = 0;
    dy = 0;
    ctx.font = "30px bold Arial";
    ctx.fillStyle = "black";
    ctx.fillText("You lost :(", canvas.width / 2 - 70, canvas.height / 2);
    clearInterval(interval);
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

function collision() {
    for (var m = 0; m < brickColumnCount; m++) {
        for (var n = 0; n < brickRowCount; n++) {
            var b = bricks[m][n];
            if (b.status == true && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = false;
                score++;
                if (score == brickRowCount * brickColumnCount) {
                    victory();
                }
            }
        }
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
            loss();
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
    myScore();
    collision();
    bounce();
    x += dx;
    y += dy;
    paddleMove();
}
function intro() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Try my JavaScript game!", 0, canvas.height / 2);
    ctx.fillText("Use left and right arrow keys to move.", 0, canvas.height / 2 + 30)
    ctx.fillText("Start the game by pressing play!", 0, canvas.height / 2 + 60)

}
var interval = setInterval(intro, 10);

function submitForm(e) {
    console.log(e);
    e.preventDefault();
}

document.getElementById("form_submit").addEventListener("click", function (event) {
    document.getElementById("contactform").reset();
    document.getElementById("popup").classList.add("popup-visible");
    console.log(event);
    event.preventDefault();
});

function closePopup() {
    document.getElementById("popup").classList.remove("popup-visible");
}
