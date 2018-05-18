var menu = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        game.stage.backgroundColor = '#000000';
    },

    create: function() {
        let playButton, homeButton;
        this.slickUI.add(playButton = new SlickUI.Element.Button(game.width / 2 - 150, 400, 300, 50));
        playButton.add(new SlickUI.Element.Text(0, 0, 'Play')).center();
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(() => {
            setTimeout(() => {
                this.start();
            }, 100);
        });

        this.slickUI.add(homeButton = new SlickUI.Element.Button(game.width / 2 - 150, 460, 300, 50));
        homeButton.add(new SlickUI.Element.Text(0, 0, 'Home Page')).center();
        homeButton.inputEnabled = true;
        homeButton.events.onInputDown.add(() => {
            $(location).attr('href', 'http://waterfightsql.azurewebsites.net');
        });
    },

    start: function () {
        game.state.start('play');
    }
}
