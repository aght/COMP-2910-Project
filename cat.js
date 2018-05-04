class Cat extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'cat_front');

        this.walkSpeed = 10;

        this.loadBackTexture();
        this.playWalkBackAnimation();

        this.scale.x = 2;
        this.scale.y = 2;
;
        game.add.existing(this);
    }

    update() {
        this.body.angle = 0;
        this.body.x += 1;
    }

    playWalkFrontAnimation() {
        this.loadFrontTexture();
        this.animations.play('cat_front_walk', this.walkSpeed, true);
    }

    playWalkSideAnimation() {
        this.loadSideTexture();
        this.animations.play('cat_side_walk', this.walkSpeed, true);
    }

    playWalkBackAnimation() {
        this.loadBackTexture();
        this.animations.play('cat_back_walk', this.walkSpeed, true);
    }

    loadFrontTexture() {
        this.loadTexture('cat_front', 0);
        this.animations.add('cat_front_walk');
    }

    loadSideTexture() {
        this.loadTexture('cat_side', 0);
        this.animations.add('cat_side_walk');
    }

    loadBackTexture() {
        this.loadTexture('cat_back', 0);
        this.animations.add('cat_back_walk');
    }
}
