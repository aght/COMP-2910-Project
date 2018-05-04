class Dog extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player_idle');

        this.isWalking = false;
        this.isIdle = true;
        this.walkSpeed = 20;
        this.idleSpeed = 7;
        this.movementSpeed = 300;
        this.scaling = 0.2;

        this.animations.add('idle');
        this.animations.play('idle', this.idleSpeed, true);

        this.scale.x = this.scaling;
        this.scale.y = this.scaling;
        this.anchor.setTo(0.5, 0.5);

        game.add.existing(this);
    }

    update() {
        this.isWalking = false;
        this.body.collideWorldBounds = true;
    }

    moveLeft() {
        this.body.velocity.x = -this.movementSpeed;
        this.scale.x = -this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveRight() {
        this.body.velocity.x = this.movementSpeed;
        this.scale.x = this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveUp() {
        this.body.velocity.y = -this.movementSpeed;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveDown() {
        this.body.velocity.y = this.movementSpeed;
        this.isWalking = true;
        this.isIdle = false;
    }

    loadWalkTexture() {
        this.loadTexture('player_walk', 0);
        this.animations.add('walk');
    }

    loadIdleTexture() {
        this.loadTexture('player_idle', 0);
        this.animations.add('idle');
    }

    playWalkAnimation() {
        this.loadWalkTexture();
        this.animations.play('walk', this.walkSpeed, true);
    }

    playIdleAnimation() {
        player.isIdle = true;
        this.loadIdleTexture();
        this.animations.play('idle', this.idleSpeed, true);
    }
}
