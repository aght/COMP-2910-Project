var lose = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        stick.visible = false;
        game.stage.backgroundColor = '#FF0000';
    },

    create: function () {
        this.timer = new CountdownTimer(0, 0, '0:04');
        this.slickUI.add(new SlickUI.Element.Text(0, 0, 'You Lose', 100)).center();
        this.slickUI.add(new SlickUI.Element.Text(0, game.height / 2 + 100, 'Score will submit in 4 seconds', 40)).centerHorizontally();
        this.slickUI.add(loseRestart = new SlickUI.Element.Button(game.width / 2 - 150, game.height / 2 + 200, 300, 50));
        loseRestart.add(new SlickUI.Element.Text(0, 0, 'Try Again')).center();
        loseRestart.events.onInputDown.add(() => {
            clearTimeout(t);
            game.state.start('play');
        });
        let t = setTimeout(function () {
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
        }, 4000);
    }
}
