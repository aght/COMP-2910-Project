var win = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        stick.visible = false;
        game.stage.backgroundColor = '#00FF00';
    },

    create: function () {
        this.slickUI.add(new SlickUI.Element.Text(0, game.height / 2 - 200, 'You Win', 100)).centerHorizontally();
        let text;
        this.slickUI.add(text = new SlickUI.Element.Text(0, game.height / 2, 'Moving to highscore page in 5 seconds', 40)).centerHorizontally();
        this.slickUI.add(loseRestart = new SlickUI.Element.Button(game.width / 2 - 150, game.height / 2 + 100, 300, 50));
        loseRestart.add(new SlickUI.Element.Text(0, 0, 'Try Again')).center();
        loseRestart.events.onInputDown.add(() => {
            clearInterval(c);
            game.state.start('restarting');
        });
        this.slickUI.add(loseHome = new SlickUI.Element.Button(game.width / 2 - 150, game.height / 2 + 170, 300, 50));
        loseHome.add(new SlickUI.Element.Text(0, 0, 'Home Page')).center();
        loseHome.events.onInputDown.add(() => {
            $(location).attr('href', 'https://waterfightsql.azurewebsites.net');
        });
        
        let count = 4;
        let c = setInterval(() => {
            text.value = 'Moving to highscore page in ' + count + ' seconds';
            count--;
            if (count === -1)
                this.submit();
        }, 1000);
    },

    submit: function () {
        var form = document.createElement('form');
        form.setAttribute("method", "post");
        form.setAttribute("action", "https://waterfightsql.azurewebsites.net/highscore/data.php");

        var hiddenName = document.createElement('input');
        hiddenName.setAttribute("type", "hidden");
        hiddenName.setAttribute("name", "name");
        hiddenName.setAttribute("value", userName);
        form.appendChild(hiddenName);

        var hiddenScore = document.createElement('input');
        hiddenScore.setAttribute("type", "hidden");
        hiddenScore.setAttribute("name", "score");
        hiddenScore.setAttribute("value", score.toString());
        form.appendChild(hiddenScore);

        document.body.appendChild(form);

        form.submit();
    }
}
