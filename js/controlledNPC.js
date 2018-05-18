class ControlledNPC extends Phaser.Sprite {
    constructor(game, x, y, imageKey) {
        super(game, x, y, imageKey);

        this.anchor.setTo(0.5, 0.5);
        game.physics.p2.enable(this);
        this.body.fixedRotation = true;

        this.wanderArea = new Phaser.Point(x, y);
        this.velocity = new Phaser.Point(0, 0);
        this.isFirstTimeWandering = true;
        this.wanderRadius = 100;

        let a = Math.random() * 2 * Math.PI;
        let r = this.wanderRadius * Math.sqrt(Math.random());
        let tX = r * Math.cos(a) + this.wanderArea.x;
        let tY = r * Math.sin(a) + this.wanderArea.y;
        this.target = new Phaser.Point(tX, tY);

        game.add.existing(this);
    }

    update() {
        this.customUpdate();
    }

    // ######################################
    // # THIS CAN BE OVERRIDDEN BY CHILDREN #
    // ######################################
    customUpdate() {}

    seek(sprite, force, speed, minDistance, maxDistance) {
        let spritePos = new Phaser.Point(sprite.x, sprite.y);

        if (minDistance && maxDistance) {
            let thisPos = new Phaser.Point(this.x, this.y);
            if (spritePos.distance(thisPos) > minDistance && spritePos.distance(thisPos) < maxDistance) {
                this.seek(spritePos, force, speed);
            } else if (spritePos.distance(thisPos) > maxDistance) {
                this.teleportTo(sprite);
            } else {
                this.body.setZeroVelocity();
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
        } else {
            this.seekPoint(spritePos, force, speed);
        }
    }

    // Private
    seekPoint(point, force, speed) {
        let direction = new Phaser.Point(point.x, point.y);
        direction.subtract(this.x, this.y);
        direction.normalize();
        direction.setMagnitude(speed);
        direction.subtract(this.velocity.x, this.velocity.y);
        direction.normalize();
        direction.setMagnitude(force);
        this.velocity.add(direction.x, direction.y);
        this.velocity.normalize();
        this.velocity.setMagnitude(speed);
        this.body.velocity.x = this.velocity.x;
        this.body.velocity.y = this.velocity.y;
    }

    flee(sprite, force, speed) {
        this.seek(sprite, force, speed);
        this.body.velocity.x *= -1;
        this.body.velocity.y *= -1;
    }

    // wander(force, speed) {
    //     if (this.isFirstTimeWandering) {
    //         this.generateNewTarget();
    //         this.isFirstTimeWandering = false;
    //         this.seekPoint(this.target, force, speed);
    //     } else {
    //         this.seekPoint(this.target, force, speed);
    //         let loc = new Phaser.Point(this.x, this.y);
    //         if (loc.distance(this.target) < 10) {
    //             this.generateNewTarget();
    //         }
    //     }
    // }

    wander(force, speed) {
        if (this.target) {
            this.seekPoint(this.target, force, speed);
            let loc = new Phaser.Point(this.x, this.y);
            if (loc.distance(this.target) < 10) {
                this.target = null;
                setTimeout(()=> {
                    this.generateNewTarget();
                }, game.rnd.integerInRange(1, 3) * 1000);
            }
        } else {
            this.body.setZeroVelocity();
        }
    }

    generateNewTarget() {
        let a = Math.random() * 2 * Math.PI;
        let r = this.wanderRadius * Math.sqrt(Math.random());
        let x = r * Math.cos(a) + this.wanderArea.x;
        let y = r * Math.sin(a) + this.wanderArea.y;
        this.target = new Phaser.Point(x, y);
    }

    teleportTo(sprite) {
        this.body.x = sprite.body.x;
        this.body.y = sprite.body.y;
    }
}
