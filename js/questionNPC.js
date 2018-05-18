class QuestionNPC extends ControlledNPC {
    constructor(game, x, y, imageKey, questionSet) {
        super(game, x, y, imageKey);

        this.frame = 7;
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');

        this.inputEnabled = true;
    }

    customUpdate() {
        if (this.velocity.x < 0) {
   
        } else if (this.velocity.x > 0) {
  
        } else {

        }
    }
}
