var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'water-fight', {
    preload: preload,
    create: create,
    update: update,
    render: render
}, false, false);

function preload() {
    //Sprite loading
    game.load.spritesheet('player_walk', './assets/Dog Walk Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('player_idle', './assets/Dog Idle Sprite Sheet547x481.png', 547, 481, 10);
    game.load.spritesheet('cat_front', './assets/cat_front.png', 32, 32, 3);
    game.load.spritesheet('cat_side', './assets/cat_side.png', 32, 32, 3);
    game.load.spritesheet('cat_back', './assets/cat_back.png', 32, 32, 3);

    //Map loading
    game.load.tilemap('Fence', './assets/maps/water-fight_Fence.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Tree top', './assets/maps/water-fight_Tree top.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Island', './assets/maps/water-fight_Island.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Treasure Chest', './assets/maps/water-fight_Treasure Chest.csv', null, Phaser.Tilemap.CSV);

    game.load.tilemap('Tree trunk', './assets/maps/water-fight_Tree trunk.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Path', './assets/maps/water-fight_Path.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Stone and Water', './assets/maps/water-fight_Stone and Water.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Grass', './assets/maps/water-fight_Grass.csv', null, Phaser.Tilemap.CSV);

    //Tileset loading
    game.load.image('1', './assets/tilesets/1.png'); 
    game.load.image('base_out_atlas', './assets/tilesets/base_out_atlas.png');
    game.load.image('fence', './assets/tilesets/fence.png')
}

var player;
var cursors;
var cat;

function create() {
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;

    game.physics.startSystem(Phaser.Physics.P2JS);

    // to set map scale user [layer name].setScale(x, x);

    var map = game.add.tilemap('Grass', 16, 16);
    map.addTilesetImage('1');
    var layer1 = map.createLayer(0);
    layer1.resizeWorld();

    var map2 = game.add.tilemap('Stone and Water', 16, 16);
    map2.addTilesetImage('1');
    var layer2 = map2.createLayer(0);
    layer2.resizeWorld();

    var map3 = game.add.tilemap('Path', 16, 16);
    map3.addTilesetImage('1');
    var layer3 = map3.createLayer(0);
    layer3.resizeWorld();

    var map4 = game.add.tilemap('Tree trunk', 16, 16);
    map4.addTilesetImage('base_out_atlas');
    var layer4 = map4.createLayer(0);
    layer4.resizeWorld();

    var map5 = game.add.tilemap('Treasure Chest', 16, 16);
    map5.addTilesetImage('base_out_atlas');
    var layer5 = map5.createLayer(0);
    layer5.resizeWorld();

    var map6 = game.add.tilemap('Island', 16, 16);
    map6.addTilesetImage('1');
    var layer6 = map6.createLayer(0);
    layer6.resizeWorld();

    var map7 = game.add.tilemap('Tree top', 16, 16);
    map7.addTilesetImage('base_out_atlas');
    var layer7 = map7.createLayer(0);
    layer7.resizeWorld();

    var map8 = game.add.tilemap('Fence', 16, 16);
    map8.addTilesetImage('fence');
    var layer8 = map8.createLayer(0);
    layer8.resizeWorld();

    //use this to remove lag!!
    layer1.renderSettings.enableScrollDelta = true;
    layer2.renderSettings.enableScrollDelta = true;
    layer3.renderSettings.enableScrollDelta = true;
    layer4.renderSettings.enableScrollDelta = true;
    layer5.renderSettings.enableScrollDelta = true;
    layer6.renderSettings.enableScrollDelta = true;
    layer7.renderSettings.enableScrollDelta = true;

    player = new Dog(game, game.world.centerX, game.world.centerY);
    game.physics.p2.enable(player);

    // tile indices between 0 and 500 collide--
    // map2.setCollisionBetween(0, 500);
    // game.physics.p2.convertTilemap(map2, layer2);
    // map5.setCollisionBetween(0, 1000);
    // game.physics.p2.convertTilemap(map5, layer5);

    map2.setCollisionBetween(0, 500);
    game.physics.p2.convertTilemap(map2, layer2);
    map8.setCollisionBetween(0, 100);
    game.physics.p2.convertTilemap(map8, layer8);
    // map4.setCollisionBetween(100, 1000);
    // game.physics.p2.convertTilemap(map4, layer4);

    game.world.setBounds(0, 0, 16 * 244, 16 * 244);

    // cat = new Cat(game, game.world.centerX - 100, game.world.centerY);
    // game.physics.p2.enable(cat);

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.08, 0.08);
}

function update() {
    player.body.angle = 0;
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
    game.debug.spriteBounds(player);
}
