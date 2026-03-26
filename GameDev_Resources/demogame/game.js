// Dummy VFX system (prevents crash)
class VFXLibrary {
 constructor(scene) {
 this.scene = scene;
 }
 play(effect, x, y) {
 console.log("VFX:", effect, x, y);
 }
}

function initiateGameOver(data) {
 alert("Game Over! Score: " + data.score);
 location.reload();
}

// Dummy handlers to prevent errors
function addEventListenersPhaser() {
 return () => {};
}

function handlePauseGame() {
 alert("Game Paused");
}

class GameScene extends Phaser.Scene {
 constructor() {
 super({ key: 'GameScene' });
 }

 preload() {
 this.isGameOver = false;

 addEventListenersPhaser.bind(this)();

 for (const key in _CONFIG.imageLoader) {
 this.load.image(key, _CONFIG.imageLoader[key]);
 }

 for (const key in _CONFIG.soundsLoader) {
 if (_CONFIG.soundsLoader[key]) {
 this.load.audio(key, [_CONFIG.soundsLoader[key]]);
 }
 }

 this.load.image("pauseButton", "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/icons/pause.png");

 const fontName = 'pix';
 const fontBaseURL = "https://aicade-ui-assets.s3.amazonaws.com/GameAssets/fonts/";
 this.load.bitmapFont('pixelfont', fontBaseURL + fontName + '.png', fontBaseURL + fontName + '.xml');

 displayProgressLoader.call(this);
 }

 create() {
 this.score = 0;

 this.sounds = {};
 for (const key in _CONFIG.soundsLoader) {
 if (_CONFIG.soundsLoader[key]) {
 this.sounds[key] = this.sound.add(key, { loop: false, volume: 0.5 });
 }
 }

 this.vfx = new VFXLibrary(this);

 this.add.image(0, 0, 'background').setOrigin(0, 0)
 .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

 this.width = this.game.config.width;
 this.height = this.game.config.height;

 this.bg = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
 this.bg.setScrollFactor(0);
 this.bg.displayHeight = this.game.config.height;
 this.bg.displayWidth = this.game.config.width;

 // Score UI
 this.scoreText = this.add.bitmapText(this.width / 2, 100, 'pixelfont', '0', 128)
 .setOrigin(0.5, 0.5)
 .setDepth(11);

 // Target
 this.target = this.add.sprite(this.width / 2, this.height / 2, 'target')
 .setInteractive();

 this.target.setScale(3);

 this.target.on('pointerdown', () => {
 this.updateScore(1);
 this.vfx.play("hit", this.target.x, this.target.y);
 this.moveTarget();
 });

 // Input
 this.input.keyboard.on('keydown-ESC', () => this.pauseGame());
 this.cursors = this.input.keyboard.createCursorKeys();
 this.input.keyboard.disableGlobalCapture();
 }

 update() {
 // No continuous logic needed
 }

 moveTarget() {
 const padding = 100;
 const x = Phaser.Math.Between(padding, this.width - padding);
 const y = Phaser.Math.Between(padding, this.height - padding);
 this.target.setPosition(x, y);
 }

 updateScore(points) {
 this.score += points;
 this.gamePoint = this.score;
 this.updateScoreText();
 }

 updateScoreText() {
 this.scoreText.setText(this.score);
 }

 gameOver() {
 if (this.sounds.background) this.sounds.background.stop();
 initiateGameOver.bind(this)({
 score: this.score
 });
 }

 pauseGame() {
 handlePauseGame.bind(this)();
 }
}

// Loader UI
function displayProgressLoader() {
 let width = 320;
 let height = 50;
 let x = (this.game.config.width / 2) - 160;
 let y = (this.game.config.height / 2) - 50;

 const progressBox = this.add.graphics();
 progressBox.fillStyle(0x222222, 0.8);
 progressBox.fillRect(x, y, width, height);

 const loadingText = this.make.text({
 x: this.game.config.width / 2,
 y: this.game.config.height / 2 + 20,
 text: 'Loading...',
 style: {
 font: '20px monospace',
 fill: '#ffffff'
 }
 }).setOrigin(0.5, 0.5);

 const progressBar = this.add.graphics();

 this.load.on('progress', (value) => {
 progressBar.clear();
 progressBar.fillStyle(0x364afe, 1);
 progressBar.fillRect(x, y, width * value, height);
 });

 this.load.on('complete', function () {
 progressBar.destroy();
 progressBox.destroy();
 loadingText.destroy();
 });
}