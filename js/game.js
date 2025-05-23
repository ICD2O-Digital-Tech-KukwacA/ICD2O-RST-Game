// Copyright (c) 2020 Mr. Coxall All rights reserved

// Created by: Kukwac
// Created on: May 2020
// This file contains the JS functions for index.html
/* global Phaser */

import SplashScene from './splashScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';

// the game scenes
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();

//* Game scene
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: 0xffffff,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
}
const game = new Phaser.Game(config);

//Load the scenes
//Any "key" is global and cannot be reused
game.scene.add('splashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
//Start title scene
game.scene.start('splashScene');