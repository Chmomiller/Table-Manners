var game = new Phaser.Game(800, 800, Phaser.AUTO);
var MainMenu = function(game) {};
MainMenu.prototype = {
    preload: function() {
        //loads in assets and text
        this.add.text(0, 50, 'Table', { fontSize: '120px', fill: 'white' });
        this.add.text(0, 160, 'Manners', { fontSize: '120px', fill: 'black' });
    },
    create: function() {
        game.stage.backgroundColor = "#4268f4";
    },
    update: function() {
        //changes states
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('GamePlay');
        }
    }
}

//variable to affect speed of scrolling
var speedFactor = 1;
var maxSpeed = 100;
//boolean for whether second player has the crate
var crate = true;
var hitGround;

//ends game
function endGame(player, box) {
    game.state.start('GameOver')
}


var GamePlay = function(game) {};
GamePlay.prototype = {
    preload: function() {
        //loads assets
        game.load.path = 'assets/img/';
        game.load.image('table', 'table.png');
        game.load.image('fork', 'fork.png');
        game.load.image('food', 'icecream.png');

    },
    create: function() {
        speedFactor = 0;
        //adds all sprites
        table = game.add.sprite(0,0, 'table');
        fork = game.add.sprite(400, 600, 'fork');
        food = game.add.sprite(300,300, 'food');
        game.physics.arcade.enable(fork);
        game.physics.arcade.enable(food);
        fork.body.gravity.y = 400;
        fork.body.collideWorldBounds = true;
    },

    update: function() {

        var cursors = game.input.keyboard.createCursorKeys();

        if (cursors.down.isDown) {
            if (speedFactor < maxSpeed) {
                speedFactor += 1;
            }
        }

        if (cursors.up.justDown){
        	fork.body.velocity.y = -5 * speedFactor;
        	speedFactor = 0;
        }

        var hitFood = game.physics.arcade.collide(fork, food);

        if(hitFood){
        	food.body.velocity.y = 300;
        	fork.body.velocity.y = 200;
        }

         if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            player.body.velocity.y = -400;
        }


        console.log("speedFactor: " + speedFactor);
        console.log("fork velocity: " + fork.body.velocity.y);


        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('GameOver');
    }
} 
}

var GameOver = function(game) {};
GameOver.prototype = {
    preload: function() {},
    create: function() {
        this.add.text(200, 90, 'Game Over', { fontSize: '80px', fill: 'white' });
        this.add.text(200, 200, 'Try Again?', { fontSize: '80px', fill: 'black' });        game.stage.backgroundColor = "#bb11ee";
    },
    update: function() {
        //moves to main menu state
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            game.state.start('MainMenu');
        }
    }
}


game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');