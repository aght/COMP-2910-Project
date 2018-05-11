class GUIButton extends Phaser.Button {
    constructor(game, x, y, key, callBack, callBackContext, overFrame, outFrame, downFrame, upFrame) {
        super(game, x, y, key, callBack, callBackContext, overFrame, outFrame, downFrame, upFrame);
        this.fixedToCamera = true;
        game.add.existing(this);
    }
}
