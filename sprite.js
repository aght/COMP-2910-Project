// Objects defined like this
function Bunny() {
    this.rect = new PIXI.Rectangle(0, 0, 208.5, 208.5);
    this.texture = PIXI.Texture.fromImage('./assets/bunny.png');
    this.texture.baseTexture.width = 1668;
    this.texture.baseTexture.height = 252;
    this.texture.frame = this.rect;

    this.sprite = new PIXI.Sprite(this.texture);

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.x = width / 2;
    this.sprite.y = height / 2;
    this.sprite.vx = 2;
    this.sprite.vy = 2;

    this.isWalking = false;
    this.move;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    // 1 = right, -1 = left
    this.lastDir = -1;

    // functions look like this ######################################
    this.getSprite = function () {
        return this.sprite;
    }

    this.update = function () {
        if (Key.isDown(Key.KEY_LEFT)) {
            this.lastDir = -1;
            this.left = true;
            this.sprite.x += -this.sprite.vx;
            this.moveLeft();
        }

        if (Key.isDown(Key.KEY_RIGHT)) {
            this.lastDir = 1;
            this.right = true;
            this.sprite.x += this.sprite.vx;
            this.moveRight();
        }

        if (Key.isDown(Key.KEY_DOWN)) {
            this.down = true;
            this.sprite.y += this.sprite.vy;
            if (this.lastDir === -1) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }
        if (Key.isDown(Key.KEY_UP)) {
            this.up = true;
            this.sprite.y += -this.sprite.vy;
            if (this.lastDir === -1) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }

        if (this.isWalking && this.left && !Key.isDown(Key.KEY_LEFT)) {
            console.log("released");
            this.lastDir = -1;
            this.resetLeft();
        }

        if (this.isWalking && this.right && !Key.isDown(Key.KEY_RIGHT)) {
            console.log("released");
            this.lastDir = 1;
            this.resetRight();
        }

        if (this.isWalking && this.down && !Key.isDown(Key.KEY_DOWN)) {
            if (this.lastDir === -1) {
                this.resetLeft();
            } else {
                this.resetRight();
            }
            this.down = false;
        }

        if (this.isWalking && this.up && !Key.isDown(Key.KEY_UP)) {
            if (this.lastDir === -1) {
                this.rect.x = 0;
                this.sprite.texture.frame = this.rect;
                clearInterval(this.move);
            } else {
                this.rect.x = 208.5 * 4;
                this.sprite.texture.frame = this.rect;
                clearInterval(this.move);
            }
            this.up = false;
        }
    }

    this.resetLeft = function () {
        this.left = false;
        this.isWalking = false;
        this.lastDir = 0;
        this.rect.x = 0;
        this.sprite.texture.frame = this.rect;
        clearInterval(this.move);
    }

    this.resetRight = function () {
        this.right = false;
        this.isWalking = false;
        this.lastDir = 0;
        this.rect.x = 208.5 * 4;
        this.sprite.texture.frame = this.rect;
        clearInterval(this.move);
    }

    this.moveLeft = function () {     
        if (!this.isWalking) {
            this.isWalking = true;

            this.rect.x = 208.5;
            this.sprite.texture.frame = this.rect;

            var _this = this;
            this.move = setInterval(function () {
                if (_this.rect.x >= (208.5 * 4)) {
                    _this.rect.x = 0;
                }
                _this.sprite.texture.frame = _this.rect;
                _this.rect.x += 208.5;
            }, 150);
        }
    }

    this.moveRight = function () {
        if (!this.isWalking) {
            this.isWalking = true;

            this.rect.x = 208.5 * 6;
            this.sprite.texture.frame = this.rect;

            var _this = this;
            this.move = setInterval(function () {
                if (_this.rect.x >= (208.5 * 8)) {
                    _this.rect.x = 208.5 * 5;
                }
                _this.sprite.texture.frame = _this.rect;
                _this.rect.x += 208.5;
            }, 170);
        }
    }
}
