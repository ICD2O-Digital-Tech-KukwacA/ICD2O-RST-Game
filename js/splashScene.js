/* global phaser */
// Created by: Kukwac
// Created on: May 2025
// This is the splash scene for the game

/**
 * This class is the splash scene for the game
 */
class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'splashScene' });
    }


    init (data) {
    this.cameras.main.setBackgroundColor("ffffff");
    }

    preload() {
        console.log('Splash Scene');
    }

    create (data) {
    }

    update (time, delta) { 
    }
}
    export default SplashScene