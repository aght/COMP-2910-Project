class QuestionNPC extends ControlledNPC {
    constructor(game, x, y, imageKey, questionSet) {
        super(game, x, y, imageKey);

        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');

        this.questions = questionSet;
        this.usedIndices = [];

        this.inputEnabled = true;
        this.events.onInputDown.add(this.createQuestionBoard);
    }

    createQuestionBoard() {

    }

    createResultBoard(result) {

    }

    validateAnswer(pickedAnswer, questionAnswer) {
        return pickedAnswer === questionAnswer;
    }

    pickRandomQuestion() {
        let i = game.rnd.integerInRange(0, this.questions.length - 1);
        while (this.usedIndices.includes(i)) {
            i = game.rnd.integerInRange(0, this.questions.length - 1);
        }
        return this.questions[i];
    }
}
