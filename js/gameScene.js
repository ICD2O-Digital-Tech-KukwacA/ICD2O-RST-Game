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
    }


    init (data) {
    this.cameras.main.setBackgroundColor("0x5f6e7a");
    }

    preload() {
        console.log('Game Scene');
    }

    create (data) {
    }

    update (time, delta) { 
    }
}
    export default GameScene