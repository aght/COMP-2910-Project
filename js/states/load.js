var load = {
    preload: function () {
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
        game.load.image('vjoy_base', './assets/joystick/base.png');
        game.load.image('vjoy_body', './assets/joystick/body.png');
        game.load.image('vjoy_cap', './assets/joystick/cap.png');
        game.load.image('vjoy_empty', './assets/joystick/empty.png');

        game.load.image('pause', './assets/ui/pause.png');
        game.plugins.add(Phaser.Plugin.AdvancedTiming);
    },

    create: function() {
        game.state.start('menu');
    }
};
