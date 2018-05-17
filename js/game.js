const APP_WIDTH = 1200;
const APP_HEIGHT = 600;

var game = new Phaser.Game({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    renderer: Phaser.AUTO,
    antialias: false,
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
});

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
