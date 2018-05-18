class Dog extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'dog_idle');

        this.isWalking = false;
        this.isWalkingLeft = false;
        this.isWalkingRight = false;
        this.isIdle = true;
        this.walkSpeed = 20;
        this.idleSpeed = 7;
        this.movementSpeed = 250;
        this.scaling = 0.17;

        this.animations.add('idle');
        this.animations.play('idle', this.idleSpeed, true);

        this.scale.x = this.scaling;
        this.scale.y = this.scaling;
        this.anchor.setTo(0.5, 0.5);

        game.physics.p2.enable(this);
        this.body.fixedRotation = true;

        game.add.existing(this);
    }

    update() {
        this.isWalking = false;
    }

    moveLeft() {
        if (this.scale.x !== -this.scaling) {
            this.body.clearShapes();
            this.body.loadPolygon('dog_physics_left_scaled', 'Left');
        }
        this.body.moveLeft(this.movementSpeed);
        this.scale.x = -this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveRight() {
        this.body.moveRight(this.movementSpeed);
        if (this.scale.x !== -this.scaling) {
            this.body.clearShapes();
            this.body.loadPolygon('dog_physics_right_scaled', 'Right');
        }
        this.scale.x = this.scaling;
        this.isWalking = true;
        this.isIdle = false;
    }

    moveUp() {
        this.body.moveUp(this.movementSpeed);
        this.isWalking = true;
        this.isIdle = false;
    }

    moveDown() {
        this.body.moveDown(this.movementSpeed);
        this.isWalking = true;
        this.isIdle = false;
    }

    loadWalkTexture() {
        this.loadTexture('dog_walk', 0);
        this.animations.add('walk');
    }

    loadIdleTexture() {
        this.loadTexture('dog_idle', 0);
        this.animations.add('idle');
    }

    playWalkAnimation() {
        this.loadWalkTexture();
        this.isIdle = false;
        if (this.scale.x < 0) {
            this.isWalkingLeft = true;
            this.isWalkingRight = false;
        } else if (this.scale.x > 0) {
            this.isWalkingRight = true;
            this.isWalkingLeft = false;
        }
        // console.log(this.isWalkingLeft + " " + this.isWalkingRight);
        this.animations.play('walk', this.walkSpeed, true);
    }

    playIdleAnimation() {
        this.isIdle = true;
        this.isWalking = false;
        this.isWalkingLeft = false;
        this.isWalkingRight = false;
        this.loadIdleTexture();
        this.animations.play('idle', this.idleSpeed, true);
    }
}
