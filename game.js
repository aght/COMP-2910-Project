const APP_WIDTH = 1200;
const APP_HEIGHT = 600;

var game = new Phaser.Game({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    renderer: Phaser.AUTO,
    antialias: false,
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
});

var pausePanel, resume, restart;

game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('play', play);

game.state.start('boot');
