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
    game.load.tilemap('Tree Top', './assets/maps/water-fight_Tree top.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Island', './assets/maps/water-fight_Island.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Treasure Chest', './assets/maps/water-fight_Treasure Chest.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Tree Trunk', './assets/maps/water-fight_Tree trunk.csv', null, Phaser.Tilemap.CSV);
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
var multimap;

function create() {
    game.renderer.renderSession.roundPixels = true;
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.forceLandscape = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    multimap = new Multimap(game);
    multimap.addTilemap('Grass', 16, 16, '1', true);
    multimap.addTilemap('Stone and Water', 16, 16, '1', true);
    multimap.addTilemap('Path', 16, 16, '1', true);
    multimap.addTilemap('Tree Trunk', 16, 16, 'base_out_atlas', true);
    multimap.addTilemap('Treasure Chest', 16, 16, 'base_out_atlas', true);
    multimap.addTilemap('Island', 16, 16, '1', true);
    multimap.addTilemap('Tree Top', 16, 16, 'base_out_atlas', true);
    multimap.addTilemap('Fence', 16, 16, 'fence', true);

    // multimap.scaleAll(1.2);
    multimap.setCollisionBetween('Stone and Water', 360, 509);
    multimap.setCollisionBetween('Fence', 0, 59);
    multimap.setCollisionBetweenSets('Tree Trunk', true, {start: 2484, stop: 2491},
        {start: 2548, stop: 2555}, {start: 2612, stop: 2613}, {start: 2618, stop: 2619},
        {start: 2676, stop: 2677}, {start: 2682, stop: 2683});
    multimap.setCollisionBetweenSets('Treasure Chest', true, {start: 2220, stop: 2221}, 
        {start: 2284, stop: 2285});

    game.world.setBounds(0, 0, 16 * 244, 16 * 244);

    cat = new Cat(game, game.world.centerX - 100, game.world.centerY);
    cat.predator = player;
    game.physics.enable(cat);

    player = new Dog(game, game.world.centerX, game.world.centerY);
    game.physics.enable(player);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT, 0.08, 0.08);
}

function update() {
    for (let layer of multimap.getCollisionLayers()) {
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(cat, layer);
    }

    player.body.velocity.set(0, 0);

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

    if (player.isIdle && cat.position.distance(player.position) <= 150) {
        cat.animations.stop(null, true);
    }

    if (cat.position.distance(player.position) > 150) {
        let behaviors = new Behaviors();
        behaviors.seek(cat, player);
    } else {
        cat.body.velocity.set(0, 0);
    }
}

function render() {
    game.debug.spriteInfo(player, 32, 32);
    // game.debug.spriteBounds(player);
}
