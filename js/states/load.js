var load = {
    preload: function () {
        game.load.json('questions', './data/questions.json');

        game.load.script('joystick', './js/plugins/phaser-virtual-joystick.js');
        game.load.atlas('arcade', './assets/joystick/generic-joystick.png', './assets/joystick/generic-joystick.json');

        game.load.audio('bgm', './assets/music/bgm.mp3');
        game.load.audio('qbgm', './assets/music/qbgm.mp3');
        game.load.audio('tbgm', './assets/music/tbgm.mp3');

        game.load.spritesheet('dog_walk', './assets/spritesheets/Dog Walk.png', 547, 481, 10);
        game.load.spritesheet('dog_idle', './assets/spritesheets/Dog Idle.png', 547, 481, 10);
        game.load.spritesheet('cat_front', './assets/spritesheets/cat_front.png', 32, 32, 3);
        game.load.spritesheet('cat_side', './assets/spritesheets/cat_side.png', 32, 32, 3);
        game.load.spritesheet('button_ui', './assets/spritesheets/button UI.png', 35, 35, 144);
        game.load.spritesheet('emoticons', './assets/spritesheets/emoticons.png', 40, 40, 78);
        game.load.spritesheet('blacksmith', './assets/spritesheets/blacksmith-001.png', 48, 64, 12);
        game.load.spritesheet('goldsmith', './assets/spritesheets/goldsmith-001.png', 48, 64, 12);
        game.load.spritesheet('woodcutter', './assets/spritesheets/woodcutter-001.png', 48, 64, 12);
        game.load.spritesheet('spawn', './assets/spritesheets/Spawn Tile.png', 32, 64, 1);

        game.load.physics('dog_physics_right', './assets/physics/dog_physics.json');
        game.load.physics('dog_physics_left', './assets/physics/dog_physics.json');

        game.load.tilemap('spawn', './assets/tilemaps/spawn.json', null, Phaser.Tilemap.JSON);
        game.load.tilemap('bounds', './assets/tilemaps/bounds.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('collision', './assets/tilemaps/collision.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.tilemap('1', './assets/tilemaps/map_Grass.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('2', './assets/tilemaps/map_BrickRoad.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('3', './assets/tilemaps/map_LionDirt.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('4', './assets/tilemaps/map_Lion.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('5', './assets/tilemaps/map_Palace.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('6', './assets/tilemaps/map_PalaceDetails.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('7', './assets/tilemaps/map_HouseGrass.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('8', './assets/tilemaps/map_HouseFence.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('9', './assets/tilemaps/map_Path.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('10', './assets/tilemaps/map_CampFireGround.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('11', './assets/tilemaps/map_Water_Stone.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('12', './assets/tilemaps/map_Small hill.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('13', './assets/tilemaps/map_Multi hill.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('14', './assets/tilemaps/map_TallGrassDecorations.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('15', './assets/tilemaps/map_TallGrassDetails.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('16', './assets/tilemaps/map_TallGrass.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('17', './assets/tilemaps/map_Stone hill.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('18', './assets/tilemaps/map_Grass Detail.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('19', './assets/tilemaps/map_CampRocks.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('20', './assets/tilemaps/map_Tents.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('21', './assets/tilemaps/map_Houses.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('22', './assets/tilemaps/map_Person.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('23', './assets/tilemaps/map_Decorations.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('24', './assets/tilemaps/map_Boat.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('25', './assets/tilemaps/map_Diamond.csv', null, Phaser.Tilemap.CSV);

        game.load.image('New1', './assets/tilesets/new1.png');
        game.load.image('BushTrees', './assets/tilesets/3.png');
        game.load.image('StoneHill', './assets/tilesets/5.png');
        game.load.image('GrassHill', './assets/tilesets/7.png');
        game.load.image('Atlas', './assets/tilesets/base_out_atlas.png');
        game.load.image('Lion', './assets/tilesets/build_atlas.png');
        game.load.image('Boat', './assets/tilesets/farming_fishing.png');
        game.load.image('Fence', './assets/tilesets/fence.png');
        game.load.image('FenceAlt', './assets/tilesets/fence_alt.png');
        game.load.image('Diamond', './assets/tilesets/gems_db16.png');
        game.load.image('People', './assets/tilesets/grab_sheet.png');
        game.load.image('Random', './assets/tilesets/obj_misk_atlas.png');
        game.load.image('Palace', './assets/tilesets/palace.png');
        game.load.image('TallGrass', './assets/tilesets/terrain_atlas.png');
        game.load.image('House', './assets/tilesets/transparent-bg-tiles.png');

        game.load.image('close', './assets/ui/kenney-theme/images/grey_boxCross.png');
        game.plugins.add(Phaser.Plugin.AdvancedTiming);
    },

    loadQuestions: function () {
        let data = game.cache.getJSON('questions');
        let questions = $.map(data, function (e) {
            return e;
        });

        return questions;
    },

    create: function () {
        pad = game.plugins.add(Phaser.VirtualJoystick);
        bgm = new Phaser.Sound(game, 'bgm', 1, true);
        qbgm = new Phaser.Sound(game, 'qbgm', 1, true);
        tbgm = new Phaser.Sound(game, 'tbgm', 1, true);
        questions = this.loadQuestions();
        game.state.start('menu');
    }
};
