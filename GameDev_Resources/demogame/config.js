const _CONFIG = {
title: "Click Target Game",
url: "",
description: "",
deviceOrientation: "landscape",
imageLoader: {
background: "https://files.catbox.moe/jkl3em.png",
target: "https://labs.phaser.io/assets/sprites/red_ball.png"
},
soundsLoader: {

background: ""
},
libLoader: {},
deviceOrientationSizes: {
landscape: {
height: 720,
width: 1280
},
portrait: {
height: 1280,
width: 720
}
},
phaserUrl: "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js",
phaserVersion: "3.80.1",
orientationSizes: {
landscape: {
width: 1280,
height: 720
},
portrait: {
width: 720,
height: 1280
}
},
mobile_portrait: false,
orientation: "landscape",
audioLoader: {}
};

const config = {
type: Phaser.AUTO,
width: _CONFIG.orientationSizes.landscape.width,
height: _CONFIG.orientationSizes.landscape.height,
scene: [GameScene],
scale: {
mode: Phaser.Scale.FIT,
autoCenter: Phaser.Scale.CENTER_BOTH,
orientation: Phaser.Scale.Orientation.LANDSCAPE
},
pixelArt: true,
physics: {
default: "arcade",
arcade: {
gravity: { y: 0 },
debug: false,
},
},
deviceOrientation: ""
};