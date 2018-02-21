'use strict';
var canvas = document.getElementById('window'),
    ctx = canvas.getContext('2d');

var player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    velX: 0,
    velY: 0,
    speed: 5,
    friction: 0.98,
    draw: function drawPlayer() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#3d3";
        ctx.fill();
        ctx.closePath();
    }
}

var controller = {
    left: false,
    right: false,
    up: false,
    down: false,    
    keyListener: function(e) {
        var keyState = (e.type == 'keydown') ? true : false;

        switch(e.keyCode) {
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
            case 40:
                controller.down = keyState;
                break;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (controller.left) {
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
    if (controller.right) {
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (controller.up) {
        if (player.velY > -player.speed) {
            player.velY--;
        }
    }
    if (controller.down) {
        if (player.velY < player.speed) {
            player.velY++;
            console.log(player.velY);
        }
    }

    player.velY *= player.friction;
    player.y += player.velY;
    player.velX *= player.friction;
    player.x += player.velX;

    if (player.x >= canvas.width-10) {
        player.x = canvas.width-10;
    } else if (player.x <= 10) {
        player.x = 10;
    }

    if (player.y > canvas.height-10) {
        player.y = canvas.height-10;
    } else if (player.y <= 10) {
        player.y = 10;
    }

    player.draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);

gameLoop();

