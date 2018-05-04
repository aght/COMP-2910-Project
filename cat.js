class Cat extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'cat_front');

        this.walkSpeed = 12;
        this.predator;
        this.scaleFactor = 2;

        this.speed = 300;
        this.force = 50;
        this.scale.x = 2;
        this.scale.y = 2;
        this.anchor.setTo(0.5, 0.5);

        game.add.existing(this);
    }

    update() {
        this.body.collideWorldBounds = true;
    }

    playWalkFrontAnimation() {
        this.loadFrontTexture();
        this.animations.play('cat_front_walk', this.walkSpeed, true);
    }

    playWalkSideAnimation(side) {
        this.loadSideTexture();
        if (side == 'left') {
            this.scale.x = this.scaleFactor;
        } else if (side == 'right'){
            this.scale.x = -this.scaleFactor;
        }
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
