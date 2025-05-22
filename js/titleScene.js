/* global phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the tile scene for the game

/**
 * This class is the title scene for the game
 */
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }


    init (data) {
    this.cameras.main.setBackgroundColor("0x5f6e7a");
    }

    preload() {
        console.log('Title Scene');
    }

    create (data) {
    }

    update (time, delta) { 
    }
}
    export default TitleScene