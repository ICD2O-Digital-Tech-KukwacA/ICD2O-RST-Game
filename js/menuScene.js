/* global phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the menu scene for the game

/**
 * This class is the menu scene for the game
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' });
    }


    init (data) {
    this.cameras.main.setBackgroundColor("0x5f6e7a");
    }

    preload() {
        console.log('Menu Scene');
    }

    create (data) {
    }

    update (time, delta) { 
    }
}
    export default MenuScene