var menu = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
    },

    create: function() {
        let playButton;
        this.slickUI.add(playButton = new SlickUI.Element.Button(game.width / 2 - 150, game.height / 2, 300, 50));
        playButton.add(new SlickUI.Element.Text(0, 0, 'Play')).center();
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(() => {
            setTimeout(() => {
                this.start();
            }, 100);
        });

        let wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wKey.onDown.addOnce(this.start, this);
    },

    start: function () {
        game.state.start('play');
    }
}
