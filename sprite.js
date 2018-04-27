// Objects defined like this
function Title() {
    // Create your sprite here #######################################
    this.texture = new PIXI.Texture.fromImage('./assets/title.png');
    this.sprite = new PIXI.Sprite(this.texture);
    //################################################################

    // Set the properties here #######################################
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.x = width / 2;
    this.sprite.y = height / 2;
    //################################################################

    // functions look like this ######################################
    this.getSprite = function () {
        return this.sprite;
    }
    //################################################################

    this.update = function () {
        if (Key.isDown(Key.KEY_LEFT)) {
            this.sprite.x += -1;
        }
        if (Key.isDown(Key.KEY_RIGHT)) {
            this.sprite.x += 1;
        }
        if (Key.isDown(Key.KEY_DOWN)) {
            this.sprite.y += 1;
        }
        if (Key.isDown(Key.KEY_UP)) {
            this.sprite.y += -1;
        }
    }
}
