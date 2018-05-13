const APP_WIDTH = 1200;
const APP_HEIGHT = 600;

var game = new Phaser.Game({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    renderer: Phaser.AUTO,
    antialias: false,
    state: this,
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
    preload: preload,
    create: create,
    update: update,
    render: render
});

var slickUI;

function preload() {
    game.load.audio('bg', './assets/music/harbor.mp3');

    game.load.spritesheet('dog_walk', './assets/spritesheets/Dog Walk.png', 547, 481, 10);
    game.load.spritesheet('dog_idle', './assets/spritesheets/Dog Idle.png', 547, 481, 10);
    game.load.spritesheet('cat_front', './assets/spritesheets/cat_front.png', 32, 32, 3);
    game.load.spritesheet('cat_side', './assets/spritesheets/cat_side.png', 32, 32, 3);
    game.load.spritesheet('button_ui', './assets/spritesheets/button UI.png', 35, 35, 144);
    game.load.spritesheet('emoticons', './assets/spritesheets/emoticons.png', 40, 40, 78);

    game.load.physics('dog_physics_right', './assets/physics/dog_physics.json');
    game.load.physics('dog_physics_left', './assets/physics/dog_physics.json');

    game.load.tilemap('lake_bounds', './assets/tilemaps/lake_bounds.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('bounds', './assets/tilemaps/bounds.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.tilemap('Cliffs(C)', './assets/tilemaps/map_Cliffs(C) - 7.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Cystal Hideen(NC)', './assets/tilemaps/map_Crystal Hidden(NC) - 8.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail Over(NC)', './assets/tilemaps/map_Detail Over(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail Under(NC)', './assets/tilemaps/map_Detail Under(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Detail(NC)', './assets/tilemaps/map_Detail(NC) - 3.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Dirt Areas(NC)', './assets/tilemaps/map_Dirt Areas(NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Dirt Grass Cover (NC)', './assets/tilemaps/map_Dirt Grass Cover (NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Grass(NC)', './assets/tilemaps/map_Grass(NC) - 1.csv', null, Phaser.Tilemap.CSV);
    game.load.tilemap('Lake(C)', './assets/tilemaps/map_Lake(C) - 1.csv', null, Phaser.Tilemap.CSV);

    game.load.image('1', './assets/tilesets/1.png');
    game.load.image('3', './assets/tilesets/3.png');
    game.load.image('7', './assets/tilesets/7.png');
    game.load.image('8', './assets/tilesets/8.png');

    game.load.image('pause', './assets/ui/pause.png');

    slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('./assets/ui/kenney-theme/kenney.json');
    game.plugins.add(Phaser.Plugin.AdvancedTiming);
}

var dog;
var cat;
var map;

var panel;

function create() {
    game.scale.forceOrientation(true, false);
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.scale.enterIncorrectOrientation.add(handleIncorrect);

    game.physics.startSystem(Phaser.Physics.P2JS);

    // let bg = game.add.audio('bg');
    // bg.play();

    createMap();

    let buttonSize = 35;
    let offset = 5;

    let pauseButton = new GUIButton(game, APP_WIDTH - (buttonSize * 1) - (offset * 1), offset, 'button_ui', function () {
        setTimeout(function () {
            game.paused = true;
        }, 500);
    }, game, 113, 113, 113, 113);

    let muteButton = new GUIButton(game, APP_WIDTH - (buttonSize * 2) - (offset * 2), offset, 'button_ui', function () {
        game.sound.mute = !game.sound.mute;
        if (!game.sound.mute) {
            muteButton.setFrames(120, 120, 120, 120);
        } else {
            muteButton.setFrames(121, 121, 121, 121);
        }
    }, game, 120, 120, 120, 120);

    game.input.onDown.add(function () {
        if (game.paused) {
            game.paused = false;
            // panel.destroy();
        }
    }, self);

    dog = new Dog(game, game.world.centerX, game.world.centerY);

    let pr = new PhysicsResize(game);
    pr.resizePolygon('dog_physics_right', 'dog_physics_right_scaled', 'Right', dog.scaling);
    pr.resizePolygon('dog_physics_left', 'dog_physics_left_scaled', 'Left', dog.scaling);
    dog.body.clearShapes();
    dog.body.loadPolygon('dog_physics_right_scaled', 'Right');

    cat = new Cat(game, game.world.centerX - 200, game.world.centerY);

    game.world.setBounds(0, 0, 16 * 200, 16 * 200);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(dog, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

    createPauseMenu();
}

function update() {
    dog.body.setZeroVelocity();

    cursorsUpdate();

    cat.seek(dog, 50, 250, 150, 300);
}

function render() {}

function cursorsUpdate() {
    if (cursors.up.isDown) {
        dog.moveUp();
    } else if (cursors.down.isDown) {
        dog.moveDown();
    }

    if (cursors.left.isDown) {
        dog.moveLeft();
    } else if (cursors.right.isDown) {
        dog.moveRight();
    }

    if (cursors.up.downDuration(1)) {
        dog.playWalkAnimation();
    } else if (cursors.down.downDuration(1)) {
        dog.playWalkAnimation();
    }

    if (cursors.left.downDuration(1)) {
        dog.playWalkAnimation();
    } else if (cursors.right.downDuration(1)) {
        dog.playWalkAnimation();
    }

    if (dog.isWalking === false && !dog.isIdle) {
        dog.playIdleAnimation();
    }
}

function handleIncorrect() {
    alert("wrong orientation");
}

function createMap() {
    map = new Multimap(game);
    map.addTilemap('Grass(NC)', 16, 16, '1', true);
    map.addTilemap('Dirt Areas(NC)', 16, 16, '1', true);
    map.addTilemap('Dirt Grass Cover (NC)', 16, 16, '1', true);
    map.addTilemap('Lake(C)', 16, 16, '1', true);
    map.addTilemap('Cliffs(C)', 16, 16, '7', true);
    map.addTilemap('Detail Under(NC)', 16, 16, '3', true);
    map.addTilemap('Detail(NC)', 16, 16, '3', true);
    map.addTilemap('Detail Over(NC)', 16, 16, '3', true);
    map.addTilemap('Cystal Hideen(NC)', 16, 16, '8', true);

    map.addCollisionMap('bounds');
    map.addCollisionMapLayer('Lake Bounds', 'Cliff Bounds');
}

function createPauseMenu() {
    let menuWidth = 400;
    let menuHeight = 300;
    let menuHalfWidth = menuWidth / 2;
    let menuHalfHeight = menuHeight / 2;
    let menuX = game.width / 2 - menuHalfWidth;
    let menuY = game.height / 2 - menuHalfHeight;
    let buttonHeight = 50;

    var resume, restart;
    slickUI.add(panel = new SlickUI.Element.Panel(menuX, menuY, menuWidth, menuHeight)); 
    panel.add(new SlickUI.Element.Text(0, 5, 'Paused', 14)).centerHorizontally();
    panel.add(resume = new SlickUI.Element.Button(10, 230, 370, buttonHeight));
    resume.inputEnabled = true;
    resume.events.onInputDown.add(function () {
        console.log("paused");
    });
    resume.add(new SlickUI.Element.Text(0, 0, 'Resume')).center();
    panel.add(restart = new SlickUI.Element.Button(10, 168, 370, buttonHeight));
    restart.inputEnabled = true;
    restart.events.onInputDown.add(function () {
        console.log("restart");
    });
    restart.add(new SlickUI.Element.Text(0, 0, 'Restart')).center();

    var logo;
    panel.add(new SlickUI.Element.Text(0, 65, 'Water Fight', 40)).centerHorizontally();

    var menu;
    slickUI.add(menu = new SlickUI.Element.DisplayObject(5, 5, game.make.sprite(0, 0, 'pause')));
}

window.addEventListener('resize', function (event) {
    game.scale.refresh();
});
