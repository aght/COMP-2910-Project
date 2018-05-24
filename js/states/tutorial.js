var tutorial = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
    },

    create: function () {
        let clickedPlay = false;

        this.slickUI.add(new SlickUI.Element.Panel(0, 0, game.width, game.height));
        this.slickUI.add(new SlickUI.Element.Text(0, 10, 'How To Play', 40)).centerHorizontally();
        this.slickUI.add(new SlickUI.Element.Text(30, 100, 'Objective', 24));
        this.slickUI.add(new SlickUI.Element.Text(45, 140, '* Answer 25 questions correctly within 2 minutes, the game ends when 25 questions are correct'));
        this.slickUI.add(new SlickUI.Element.Text(45, 165, '* Try to get as many points as possible, every question correct will give you 250 points, for every \n  question wrong, you lose 50 points, your score can also drop below 0'));
        this.slickUI.add(new SlickUI.Element.Text(30, 235, 'Controls', 24));
        if (mobileTester.isMobile()) {
            this.slickUI.add(new SlickUI.Element.Text(45, 275, "* Use the joystick to move"));
            this.slickUI.add(new SlickUI.Element.Text(45, 300, '* Tap the NPCs to get a question'));
        } else {
            this.slickUI.add(new SlickUI.Element.Text(45, 275, "* Use the arrow keys to move"));
            this.slickUI.add(new SlickUI.Element.Text(45, 300, '* Click the NPCs to get a question'));
        }

        let playbutton;
        this.slickUI.add(playbutton = new SlickUI.Element.Button(game.width / 2 - 200, game.height - 100, 400, 50));
        playbutton.add(new SlickUI.Element.Text(0, 0, 'Play!')).center();
        playbutton.events.onInputDown.add(() => {
            if (!clickedPlay) {
                clickedPlay = true;
                game.state.start('play');
            }
        });
    }
}
