class Cat extends ControlledNPC {
    constructor(game, x, y) {
        super(game, x, y, 'cat_front');

        this.isWalking = false;
        this.isWalkingLeft = false;
        this.isWalingRight = false;
        this.walkSpeed = 12;
        this.scaleFactor = 1.7;

        this.scale.x = this.scaleFactor;
        this.scale.y = this.scaleFactor;

        this.inputEnabled = true;

        this.emote = game.add.sprite(this.body.x, this.body.y, '');
        this.emote.anchor.setTo(0.5);
        this.emotePlaying = false;
        this.events.onInputDown.add(this.onInputDown, this);
    }

    customUpdate() {
        this.emote.x = this.body.x;
        this.emote.y = this.body.y - 32;

        if (this.velocity.x < 0) {
            if (!this.isWalking) {
                this.loadSideTexture();
                this.animations.play('cat_side_walk', this.walkSpeed, true);
                this.isWalking = true;
                this.scale.x = this.scaleFactor;
            }
        } else if (this.velocity.x > 0) {
            if (!this.isWalking) {
                this.loadSideTexture();
                this.animations.play('cat_side_walk', this.walkSpeed, true);
                this.isWalking = true;
                this.scale.x = -this.scaleFactor;
            }
        } else if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.stopAnimations();
        }
    }

    playWalkFrontAnimation() {
        this.loadFrontTexture();
        this.animations.play('cat_front_walk', this.walkSpeed, true);
    }

    playWalkSideAnimation(side) {
        this.loadSideTexture();
        if (side == 'left') {
            this.isWalkingLeft = true;
            this.isWalkingRight = false;
            this.scale.x = this.scaleFactor;
        } else if (side == 'right') {
            this.isWalkingRight = true;
            this.isWalkingLeft = false;
            this.scale.x = -this.scaleFactor;
        }
        this.isWalking = true;
        this.animations.play('cat_side_walk', this.walkSpeed, true);
    }

    stopAnimations() {
        this.animations.stop(null, true);
        this.isWalking = false;
        this.isWalkingLeft = false;
        this.isWalkingRight = false;
    }

    loadFrontTexture() {
        this.loadTexture('cat_front', 0);
        this.animations.add('cat_front_walk');
    }

    loadSideTexture() {
        this.loadTexture('cat_side', 0);
        this.animations.add('cat_side_walk');
    }

    onInputDown() {
        if (!this.emotePlaying) {
            this.emote.visible = this.emotePlaying = true;
            this.emote.loadTexture('emoticons', 0);
            let emotes = [
                [0, 1, 2],
                [3, 4, 5],
                [12, 13, 14],
                [15, 16, 17],
                [24, 25, 26],
                [27, 28, 29],
                [36, 37, 38],
                [63, 64, 65]
            ];
            let i = game.rnd.integerInRange(0, emotes.length)
            this.emote.animations.add('emote', emotes[i], true);
            this.emote.animations.play('emote', 2, true);

            setTimeout(() => {
                this.emote.animations.add('end', [72, 73, 74, 75, 76, 77], true);
                this.emote.animations.currentAnim.onComplete.add(() => {
                    this.emote.animations.stop(null, true);
                    this.emote.visible = this.emotePlaying = false;
                });
                this.emote.animations.play('end', 20);
            }, 3000);
        }
    }
}
