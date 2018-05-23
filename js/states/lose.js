var lose = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        stick.visible = false;
    },

    create: function () {
        this.slickUI.add(new SlickUI.Element.Text(0, 0, 'You Lose', 100)).center();
        this.slickUI.add(new SlickUI.Element.Text(0, game.height / 2 + 100, 'Please Wait...', 50)).centerHorizontally();
        setTimeout(function () {
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
        }, 3000);
    }
}
