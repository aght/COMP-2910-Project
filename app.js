var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'water-fight', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    //Sprite loading
    game.load.spritesheet('player_walk', './assets/Dog Walk Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('player_idle', './assets/Dog Idle Sprite Sheet547x481.png', 547, 481, 10);

    //Map loading
    game.load.tilemap('map', './waterFight2_Grass.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map2', './waterFight2_Water and Stone.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map3', './waterFight2_Path.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map4', './waterFight2_Items.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('map5', './waterFight2_Cave thing.csv', null, Phaser.Tilemap.CSV);

    //Tileset loading
    game.load.image('1', './assets/1.png');
    game.load.image('atlas', './assets/base_out_atlas.png');
}

var player;
var cursors;

function create() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;
    game.physics.startSystem(Phaser.Physics.P2JS);

    //to set map scale user [layer name].setScale(x, x);

    var map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('1');
    var layer1 = map.createLayer(0);
    layer1.resizeWorld();

    var map2 = game.add.tilemap('map2', 16, 16);
    map2.addTilesetImage('1');
    var layer2 = map2.createLayer(0);
    layer2.resizeWorld();

    var map3 = game.add.tilemap('map3', 16, 16);
    map3.addTilesetImage('1');
    var layer3 = map3.createLayer(0);
    layer3.resizeWorld();

    var map5 = game.add.tilemap('map5', 16, 16);
    map5.addTilesetImage('atlas');
    var layer5 = map5.createLayer(0);
    layer5.resizeWorld();
    
    var map4 = game.add.tilemap('map4', 16, 16);
    map4.addTilesetImage('atlas');
    var layer4 = map4.createLayer(0);
    layer4.resizeWorld();

    //use this to remove lag!!
    layer1.renderSettings.enableScrollDelta = true;
    layer2.renderSettings.enableScrollDelta = true;
    layer3.renderSettings.enableScrollDelta = true;
    layer4.renderSettings.enableScrollDelta = true;
    layer5.renderSettings.enableScrollDelta = true;

    // tile indices between 0 and 500 collide--
    map2.setCollisionBetween(0, 500);
    game.physics.p2.convertTilemap(map2, layer2);
    map5.setCollisionBetween(0, 1000);
    game.physics.p2.convertTilemap(map5, layer5);

    game.world.setBounds(0, 0, 1952, 1952);

    player = new Dog(game, game.world.centerX, game.world.centerY);
    game.physics.p2.enable(player);
    
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

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
    player.body.angle = 0;
}

function render() {
    game.debug.spriteInfo(player, 32, 32);
}
