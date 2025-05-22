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
    this.cameras.main.setBackgroundColor("ffffff");
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