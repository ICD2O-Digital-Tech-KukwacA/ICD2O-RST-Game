/* global phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the game scene for the game

/**
 * This class is the game scene for the game
 */
class GameScene extends Phaser.Scene {
    
    //Create an alien
    createAlien() {
        const alienXLocation = Math.floor(Math.random() * 1920) + 1;
        let alienXVelocity = Math.floor(Math.random() * 50) + 1; // Random speed between 50 and 150
        alienXVelocity *= Math.random(Math.random()) ? 1 : -1; // Randomly set direction to left or right
        const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien');
        anAlien.body.velocity.y = 335; // Set the alien's speed
        anAlien.body.velocity.x = alienXVelocity; // Set the alien's horizontal speed
        this.alienGroup.add(anAlien);
    }

    constructor() {
        super({ key: 'gameScene' });
        
        this.background = null;
        this.ship = null;
        this.fireMissile = false;
    }


    init (data) {
    this.cameras.main.setBackgroundColor("#fffdfd");
    }

    preload() {
        console.log('Game Scene');
        // Image files
        this.load.image('starBackground', './assets/starBackground.png');
        this.load.image('ship', './assets/spaceShip.png');
        this.load.image('missile', './assets/missile.png');
        this.load.image('alien', './assets/alien.png');
        // Sound files
        this.load.audio('laser', './assets/laser1.wav');
        this.load.audio('explosion', './assets/barrelExploding.wav');
    }

    create(data) {
        this.background = this.add.image(0, 0, 'starBackground').setScale(2.0);
        this.background.setOrigin(0, 0);
        
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');

        // Creates a group for missiles
        this.missileGroup = this.physics.add.group();

        // Creates a group for aliens
        this.alienGroup = this.add.group();
        this.createAlien();

        // Set up collision detection between missiles and aliens
        this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
            alienCollide.destroy(); // Destroy the alien
            missileCollide.destroy(); // Destroy the missile
            this.sound.play('explosion'); // Play explosion sound on collision
            // Create a new alien
            this.createAlien(); 
            this.createAlien();
        }.bind(this));
    }

    update(time, delta) { 
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
            if (this.fireMissile === false) {
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