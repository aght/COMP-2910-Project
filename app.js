const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    backgroundColor: 0x93ed57,
});

window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

document.body.appendChild(app.view);

let titleTexture = PIXI.Texture.fromImage('title.png');
titleTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

let dir = 1;
let title;

function createTitle() {
    title = new PIXI.Sprite(titleTexture);
    title.interactive = true;
    title.buttonMode = true;
    title.anchor.set(0.5);
    title.scale.set(1.4);
    title.vx = 0;
    title.vy = 0;

    title.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    title.x = app.screen.width / 2;
    title.y = app.screen.height / 2 - title.height;

    app.stage.addChild(title);
}

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

createTitle();
