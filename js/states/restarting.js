var restarting = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        game.stage.backgroundColor = '#ffffff';
    },

    create: function () {
        this.numDots = 0;
        this.text;
        this.slickUI.add(this.text = new SlickUI.Element.Text(0, 0, 'Restarting', 60)).center();
        this.interval = setInterval(() => {
            ++this.numDots;
            if (this.numDots === 4) {
                this.text.value = 'Restarting';
                this.numDots = 0;
            } else {
                this.text.value = this.text.value + '.';
            }
        }, 600);

        setTimeout(() => {
            clearInterval(this.interval);
            game.state.start('play');
        }, 6000);
    },


}
