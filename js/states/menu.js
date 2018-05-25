var menu = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        game.stage.backgroundColor = '#000000';
    },

    create: function () {
        let clickedSubmit;

        namePanel = this.slickUI.add(new SlickUI.Element.Panel(0, 0, game.width, game.height));
        namePanel.add(new SlickUI.Element.Text(0, 100, 'Please enter your name', 32)).centerHorizontally();
        namePanel.add(nameInput = new SlickUI.Element.TextField(game.width / 2 - (game.width / 2 / 2), 200, game.width / 2, 50, 24));
        nameInput.events.onOK.add(() => {
            userName = nameInput.value;
            if (userName !== '') {
                this.start();
            }
        });
        namePanel.add(nameOKButton = new SlickUI.Element.Button(game.width / 2 - 100, game.height / 2, 200, 50));
        nameOKButton.add(new SlickUI.Element.Text(0, 0, 'Submit')).center();
        nameOKButton.events.onInputDown.add(() => {
            if (!clickedSubmit) {
                clickedSubmit = true;
                userName = nameInput.value;
                if (userName !== '') {
                    this.start();
                }
            }
        })
    },

    start: function () {
        game.state.start('tutorial');
    }
}
