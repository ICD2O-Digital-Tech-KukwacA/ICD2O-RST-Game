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
    this.cameras.main.setBackgroundColor("0x5f6e7a");
    }

    preload() {
        console.log('Game Scene');
        // Images
        this.load.image('startBackground', './assets/startBackground.png');
        this.load.image('ship', './assets/spaceShip.png');
    }

    create(data) {
        this.background = this.add.image(0, 0, 'startBackground').setScale(2.0);
        this.background.setOrigin(0, 0);
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');
    }

    update (time, delta) { 
    }
}
    export default GameScene