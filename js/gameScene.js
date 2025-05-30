/* global phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the game scene for the game

/**
 * This class is the game scene for the game
 */
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
        
        this.background = null;
        this.ship = null;
    }


    init (data) {
    this.cameras.main.setBackgroundColor("#fffdfd");
    }

    preload() {
        console.log('Game Scene');
        // Images
        this.load.image('planetBackground', './assets/planetBackground.jpg');
        this.load.image('ship', './assets/spaceShip.jpg');
    }

    create(data) {
        this.background = this.add.image(0, 0, 'planetBackground').setScale(2.0);
        this.background.setOrigin(0, 0);
        
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');
    }

    update(time, delta) { 
        const keyLeftObj = this.input.keyboard.addKey('LEFT');
        const keyRightObj = this.input.keyboard.addKey('RIGHT');
        
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
    }
}
    export default GameScene