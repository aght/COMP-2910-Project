const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    backgroundColor: 0x000000,
    antialias: true
});

// Variables must be above ALL function calls
var bunny = new Bunny();

// MUST CALL!
setup();

function setup() {
    document.body.appendChild(app.view);

    // Add and change the object here
    app.stage.addChild(bunny.getSprite());

    loop();
}

function loop() {
    requestAnimationFrame(loop);

    // call the updating functions here
    bunny.update();

    app.renderer.render(app.stage);
}
