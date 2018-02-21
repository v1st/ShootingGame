'use strict';
var canvas = document.getElementById('window'),
    ctx = canvas.getContext('2d');
// Player model
var player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    velX: 0,
    velY: 0,
    speed: 5,
    friction: 0.93,
    draw: function drawPlayer() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0fe3ff";
        ctx.fill();
        ctx.closePath();
    },
}
// Keyboard control function
var controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false,
    keyListener: function (e) {
        var keyState = (e.type == 'keydown');

        switch (e.keyCode) {
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
    },
    mouseListener: function (e) {
        var mouseState = (e.type == 'mousedown');

        if (e.button === 0) {
            controller.shoot = mouseState;
            console.log('pew');
        }
    }
}

var bullets = {
    draw: function drawBullets() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#ffff3a";
        ctx.fill();
        ctx.closePath();
    },
}

// Game loop to redraw frames and take input
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Keyboard controls for movement
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
        }
    }

    player.velY *= player.friction;
    player.y += player.velY;
    player.velX *= player.friction;
    player.x += player.velX;

    if (player.x >= canvas.width - 10) {
        player.x = canvas.width - 10;
    } else if (player.x <= 10) {
        player.x = 10;
    }

    if (player.y > canvas.height - 10) {
        player.y = canvas.height - 10;
    } else if (player.y <= 10) {
        player.y = 10;
    }

    if (controller.shoot) {
        bullets.draw();
    }

    player.draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.addEventListener('mousedown', controller.mouseListener);
window.addEventListener('mouseup', controller.mouseListener)

gameLoop();
