var menu = {
    create: function() {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('.././assets/ui/kenney-theme/kenney.json');

        // let playButton;
        // let menuPanel;
        // this.slickUI.add(menuPanel = new SlickUI.Element.Panel(game.width / 2, game.height / 2, 400, 300));

        let wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}
