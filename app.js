const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    backgroundColor: 0x262626,
    antialias: true
});

var map = new PIXI.Container();
const mapVel = 2;
var texture = new PIXI.Texture.fromImage('./assets/grass.png');
var background = new PIXI.Sprite(texture);

var bunny = new Bunny();

setup();

function setup() {
    document.body.appendChild(app.view);
    background.scale.set(1.3, 1.3);
    background.anchor.set(0.5, 0.5);

    map.addChild(background);
    map.pivot.set(0, 0);
    map.position.set(width / 2, height / 2);
    app.stage.addChild(map);
    bunny.getSprite().position.set(width / 2, height / 2);
    app.stage.addChild(bunny.getSprite());

    loop();
}

function loop() {
    requestAnimationFrame(loop);
    updateMap();

    app.renderer.render(app.stage);
}

function updateMap() {
    let sprite = bunny.getSprite();

    if (!(sprite.x - sprite.width / 2 < map.x - map.width / 2)) {
        if (Key.isDown(Key.KEY_LEFT)) {
            map.x += mapVel;
        }
    }

    if (!(sprite.x + sprite.width / 2 > map.x + map.width / 2)) {
        if (Key.isDown(Key.KEY_RIGHT)) {
            map.x += -mapVel;
        }
    }

    if (!(sprite.y - sprite.height / 2 < map.y - map.height / 2)) {
        if (Key.isDown(Key.KEY_UP)) {
            map.y += mapVel;
        }
    }

    if (!(sprite.y + sprite.height / 2 > map.y + map.height / 2)) {
        if (Key.isDown(Key.KEY_DOWN)) {
            map.y += -mapVel;
        }
    }
}

