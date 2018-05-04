class Behaviors {
    constructor() {}

    seek(spriteA, spriteB) {
        let dir = new Phaser.Point(spriteB.x, spriteB.y);
        dir.subtract(spriteA.x, spriteA.y);
        dir.normalize();
        dir.setMagnitude(spriteA.speed);
        dir.subtract(spriteA.body.velocity.x, spriteA.body.velocity.y);
        dir.normalize();
        dir.setMagnitude(spriteA.force);
        spriteA.body.velocity.add(dir.x, dir.y);
        spriteA.body.velocity.normalize();
        spriteA.body.velocity.setMagnitude(spriteA.speed);
    }
}
