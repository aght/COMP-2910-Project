var lose = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
    },

    create: function () {
        this.slickUI.add(new SlickUI.Element.Text(0, 0, 'You Lose', 100)).center();
    }
}
