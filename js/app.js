//setting audio files for sounds
var snd = new Audio("sound.js/sounds/explosion.wav");
var snd1 = new Audio("sound.js/sounds/bounce.mp3"); // buffers automatically when created
//setting the score variable
var Score = function() {
    ctx.clearRect(200, 600, 500, 500);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + player.score, 200, 620);

};
// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 100) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 420) {
        this.x = -10;
        this.speed = Math.floor((Math.random() * 100) + 100);
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {

    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-princess-girl.png';
    this.score = 0;
};
//resetting the player's position
Player.prototype.update = function() {

    this.x = 200;
    this.y = 400;
};
//checking for collision between player and gems
Player.prototype.collision = function() {

    for (var i = 0; i < allGems.length; i++) {
        if (this.x < allGems[i].x + 65 &&
            this.x + 65 > allGems[i].x &&
            this.y < allGems[i].y + 65 &&
            65 + this.y > allGems[i].y) {
            allGems[i].x = -100;
            allGems[i].y = -100;
            this.score += 100;
            snd1.play();
        }
    }

};
//displaying the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    Score();
};
//checking if game won
Player.prototype.checkWinner = function() {
    if (this.y === -15) {
        //player.update();
        alert("You won");
        document.location.reload();
    }
};
//handling input keys
Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 101;
            }
            break;
        case 'up':
            if (this.y > 0) {

                this.y = this.y - 83;
                player.checkWinner();
            }
            break;
        case 'down':
            if (this.y < 350) {
                this.y = this.y + 83;
            }
            break;
    }

};

// Now instantiate your objects.
var enemy1 = new Enemy(-101, 55, 'images/enemy-bug.png');
var enemy2 = new Enemy(-101, 140, 'images/enemy-bug.png');
var enemy3 = new Enemy(-101, 225, 'images/enemy-bug.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
//checking for collisions between enemy and player
Enemy.prototype.checkCollisions = function(Player) {

    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        //alert("you lose");
        snd.play();
        player.score -= 50;
        player.update();
    } else {
        player.collision();

    }

};

// Place the player object in a variable called player

var player = new Player(200, 400, 'images/char-princess-girl.png');
var allPlayers = [];
allPlayers.push(player);
//Gem class
var Gem = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.width = 65;
    this.height = 65;
    this.sprite = 'images/Gem Blue.png';
};
//displaying gems on screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var gem1 = new Gem(300, 240, 'images/Gem Blue.png');
var gem2 = new Gem(100, 40, 'images/Gem Green.png');
var allGems = [];
allGems.push(gem1);
allGems.push(gem2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});