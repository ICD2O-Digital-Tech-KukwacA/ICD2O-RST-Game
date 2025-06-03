/* global Phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the game scene for the game

/**
 * This class is the game scene for the game
 */
class GameScene extends Phaser.Scene {
    
    //Create an alien
    createAlien() {
        // Only a new alien if there are fewer than 25 aliens
        if (this.alienGroup.countActive(true) <= 25) {
        const alienXLocation = Math.floor(Math.random() * 1920) + 1;
        let alienXVelocity = Math.floor(Math.random() * 50) + 1; // Random speed between 50 and 1
        alienXVelocity *= Math.round(Math.random()) ? 1 : -1; // Randomly set direction to left or right
        const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien');
        anAlien.body.velocity.y = 200; // Set the alien's speed
        anAlien.body.velocity.x = alienXVelocity; // Set the alien's horizontal speed
        this.alienGroup.add(anAlien);
        }
    }

    constructor() {
        super({ key: 'gameScene' });
        
        this.background = null;
        this.ship = null;
        this.fireMissile = false;
        this.isGameOver = false; // Flag to check if the game is over
        this.score = 0;
        this.scoreText = null;
        this.scoreTextStyle = { font: '65px Arial', fill: '#fde4b9', align: 'center' };
        this.gameOverText = null;
        this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' };
    }


    init (data) {
    this.cameras.main.setBackgroundColor("#fffdfd");
    }

    preload() {
        console.log('Game Scene');
        // Image files
        this.load.image('newBackgroundImage', './assets/newBackgroundImage.png');
        this.load.image('ship', './assets/spaceShipWhite.png');
        this.load.image('missile', './assets/missile.png');
        this.load.image('alien', './assets/alienShipCartoon.png');
        // Sound files
        this.load.audio('laser', './assets/laserShot.wav');
        this.load.audio('explosion', './assets/collisionSound2.wav');
        this.load.audio('gameOver', './assets/collisionSound.wav');
    }

    create(data) {
        this.fireMissile = false; // Reset fireMissile to false at the start of the game
        this.isGameOver = false; // Reset isGameOver to false at the start of the game
        this.score = 0;
        this.background = this.add.image(0, 0, 'newBackgroundImage').setScale(2.0);
        this.background.setOrigin(0, 0);

        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle);
        

        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');

        // Creates a group for missiles
        this.missileGroup = this.physics.add.group();

        // Creates a group for aliens
        this.alienGroup = this.add.group();
        this.createAlien();

        // Set up collision detection between missiles and aliens
        this.physics.add.overlap(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
            alienCollide.destroy(); // Destroy the alien
            missileCollide.destroy(); // Destroy the missile
            this.sound.play('explosion'); // Play explosion sound on collision
            this.score = this.score +1; // Increase score by 1
            this.scoreText.setText('Score: ' + this.score.toString()); // Update score text
            // Create a new alien
            this.createAlien(); 
            this.createAlien();
        }.bind(this));

        // Set up collision detection between space ship and aliens
        this.physics.add.overlap(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
            this.sound.play('gameOver'); // Play explosion sound on collision
            this.physics.pause(); // Pause the game
            alienCollide.destroy(); // Destroy the alien
            shipCollide.destroy(); // Destroy the missile
            // Restart the game when clicked
            this.isGameOver = true; // Set game over flag to true
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5);
            this.gameOverText.setInteractive({ useHandCursor: true });
            this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));
        }.bind(this));
    }

    update(time, delta) { 
        if (this.isGameOver) {
            return; // Stop updating if the game is over
        }

        const keyLeftObj = this.input.keyboard.addKey('LEFT');
        const keyRightObj = this.input.keyboard.addKey('RIGHT');
        const keySpaceObj = this.input.keyboard.addKey('SPACE');

        if (keyLeftObj.isDown === true) {
            this.ship.x = this.ship.x - 20;
            if (this.ship.x < 0) {
                this.ship.x = 0; // Prevent ship from going off the left edge
            }
        }

        if (keyRightObj.isDown === true) {
            this.ship.x = this.ship.x + 20;
            if (this.ship.x > 1920) {
                this.ship.x = 1920; // Prevent ship from going off the right edge
            }
        }

        if (keySpaceObj.isDown === true) {
            if (this.fireMissile === false &&! this.isGameOver) {
                // fire missile
                this.fireMissile = true;
                const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
                this.missileGroup.add(aNewMissile);
                this.sound.play('laser'); // Play laser sound
            }
        }
        if (keySpaceObj.isUp === true) {
            this.fireMissile = false; // Reset fireMissile when space is released
        }

        this.missileGroup.children.each(function (item) {
            item.y = item.y - 20; // Move missile up
            if (item.y < 0) {
                item.destroy(); // Destroy missile if it goes off the top of the screen
            }  
        });
    }
}
    export default GameScene