// Objects defined like this
function Bunny() {
    this.rect = new PIXI.Rectangle(0, 0, 208.5, 252);
    this.texture = PIXI.Texture.fromImage('./assets/bunny.png');
    this.texture.baseTexture.width = 1668;
    this.texture.baseTexture.height = 256;
    this.texture.frame = this.rect;

    this.sprite = new PIXI.Sprite(this.texture);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.vx = 2;
    this.sprite.vy = 2;
    this.sprite.scale.set(0.3, 0.3);

    this.getSprite = function () {
        return this.sprite;
    }
}
