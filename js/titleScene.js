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
        this.titleSceneBackgroundImage = null;
        this.titleSceneText = null;
        this.titleSceneTextStyle = {font: '150px Arial', fill: '#fde4b9', align: 'center'};
    }


    init (data) {
    this.cameras.main.setBackgroundColor("0x5f6e7a");
    }

    preload() {
        console.log('Title Scene');
        this.load.image('titleSceneBackgroundImage', './assets/aliens_screen_image.jpg');
    }

    create(data) {
        this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackgroundImage').setScale(2.75);
        this.titleSceneBackgroundImage.x = 1920 / 2
        this.titleSceneBackgroundImage.y = 1080 / 2
        this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Guardians of the Galaxy', this.titleSceneTextStyle).setOrigin(0.5);
    }

    update(time, delta) {
        if (time > 10000) {
            this.scene.switch('menuScene');
        }
    }
}
    export default TitleScene