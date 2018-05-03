var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image('background', './assets/1920x1080_Grid.png');
    game.load.spritesheet('player_walk', './assets/Dog Walk Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('player_idle', './assets/Dog Idle Sprite Sheet547x481.png', 547, 481, 10);
}

var player;
var cursors;

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);

    player = new Dog(game, game.world.centerX, game.world.centerY);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.08, 0.08);
}

function update() {
    player.body.setZeroVelocity();
    player.isWalking = false;

    if (cursors.up.isDown) {
        player.moveUp();
    } else if (cursors.down.isDown) {
        player.moveDown();
    }

    if (cursors.left.isDown) {
        player.moveLeft();
    } else if (cursors.right.isDown) {
        player.moveRight();
    }

    if (cursors.up.downDuration(1)) {
        player.playWalkAnimation();
    } else if (cursors.down.downDuration(1)) {
        player.playWalkAnimation();
    }

    if (cursors.left.downDuration(1)) {
        player.playWalkAnimation();
    } else if (cursors.right.downDuration(1)) {
        player.playWalkAnimation();
    }

    if (player.isWalking === false && !player.isIdle) {
        player.playIdleAnimation();
    }
}

function render() {
    game.debug.spriteInfo(player, 32, 32);
}
