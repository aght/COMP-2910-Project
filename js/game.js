const APP_WIDTH = 1200;
const APP_HEIGHT = 600;
const TILES_X = 305;
const TILES_Y = 244;
const TILE_SIZE = 16;

var game = new Phaser.Game({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    renderer: Phaser.AUTO,
    antialias: false,
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
});

var loseRestart;
var namePanel;
var nameInput;
var namePrompt;
var userName;
var nameOKButton;

var scoreText;
var score = 0;
var isPaused = false;
var pad, stick;
var bgm, qbgm;
var countdown;
var questions;
var usedIndices = [];
var pausePanel, resume, restart;
var mobileTester = new MobileTester();

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('lose', lose);
game.state.add('restarting', restarting);

game.state.start('boot');
