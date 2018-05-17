var play = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
    },

    create: function () {
        this.map = new Multimap(game);

        this.createMap();

        this.dog = new Dog(game, game.world.centerX, game.world.centerY);
        this.cat = new Cat(game, game.world.centerX - 200, game.world.centerY);

        let pr = new PhysicsResize(game);
        pr.resizePolygon('dog_physics_right', 'dog_physics_right_scaled', 'Right', this.dog.scaling);
        pr.resizePolygon('dog_physics_left', 'dog_physics_left_scaled', 'Left', this.dog.scaling);
        this.dog.body.clearShapes();
        this.dog.body.loadPolygon('dog_physics_right_scaled', 'Right');
        this.dog.inputEnabled = true;
        this.dog.events.onInputDown.add(() => {
            this.createQuestionBoard();
            // console.log('hi')
        })

        this.createButtons();
        game.input.onDown.add(this.pauseMenuEvents, self);

        this.countdown = new CountdownTimer(100, 100, '3:00', 32);
        this.countdown.flashOnComplete = true;
        this.countdown.onComplete(() => {
            game.state.start('lose');
        });
        this.slickUI.add(this.countdown.text);
        this.countdown.start();

        game.world.setBounds(0, 0, 16 * 200, 16 * 200);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        this.keys = game.input.keyboard.createCursorKeys();
        game.camera.follow(this.dog, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

        this.isRunning = false;
        this.seconds = 0;
        this.minutes = 0;
    },

    update: function () {
        this.dog.body.setZeroVelocity();
        this.updateKeys();
        this.cat.seek(this.dog, 50, 250, 150, 300);
    },

    createMap: function () {
        this.map.addTilemap('Grass(NC)', 16, 16, '1', true);
        this.map.addTilemap('Dirt Areas(NC)', 16, 16, '1', true);
        this.map.addTilemap('Dirt Grass Cover (NC)', 16, 16, '1', true);
        this.map.addTilemap('Lake(C)', 16, 16, '1', true);
        this.map.addTilemap('Cliffs(C)', 16, 16, '7', true);
        this.map.addTilemap('Detail Under(NC)', 16, 16, '3', true);
        this.map.addTilemap('Detail(NC)', 16, 16, '3', true);
        this.map.addTilemap('Detail Over(NC)', 16, 16, '3', true);
        this.map.addTilemap('Cystal Hideen(NC)', 16, 16, '8', true);

        this.map.addCollisionMap('bounds');
        this.map.addCollisionMapLayer('Lake Bounds', 'Cliff Bounds');
    },

    createPauseMenu: function () {
        let menuWidth = 400;
        let menuHeight = 300;
        let menuHalfWidth = menuWidth / 2;
        let menuHalfHeight = menuHeight / 2;
        let menuX = game.width / 2 - menuHalfWidth;
        let menuY = game.height / 2 - menuHalfHeight;
        let buttonHeight = 50;

        this.slickUI.add(pausePanel = new SlickUI.Element.Panel(menuX, menuY, menuWidth, menuHeight));
        pausePanel.add(new SlickUI.Element.Text(0, 5, 'Paused', 14)).centerHorizontally();

        pausePanel.add(resume = new SlickUI.Element.Button(10, 230, 370, buttonHeight));
        resume.add(new SlickUI.Element.Text(0, 0, 'Resume')).center();

        pausePanel.add(restart = new SlickUI.Element.Button(10, 168, 370, buttonHeight));
        restart.add(new SlickUI.Element.Text(0, 0, 'Restart')).center();

        pausePanel.add(new SlickUI.Element.Text(0, 65, 'Water Fight', 40)).centerHorizontally();
    },

    createButtons: function () {
        let buttonSize = 35;
        let offset = 5;
        let pauseButton = new GUIButton(game, APP_WIDTH - (buttonSize * 1) - (offset * 1), offset, 'button_ui', () => {
            if (game.paused === false) {
                this.createPauseMenu();
                setTimeout(() => {
                    game.paused = true;
                }, 200);
            }
        }, game, 113, 113, 113, 113);

        let muteButton = new GUIButton(game, APP_WIDTH - (buttonSize * 2) - (offset * 2), offset, 'button_ui', function () {
            game.sound.mute = !game.sound.mute;
            if (!game.sound.mute) {
                muteButton.setFrames(120, 120, 120, 120);
            } else {
                muteButton.setFrames(121, 121, 121, 121);
            }
        }, game, 120, 120, 120, 120);
    },

    pauseMenuEvents: function (e) {
        if (game.paused) {
            if (e.x > pausePanel.x + 10 && e.x < pausePanel.x + pausePanel.width - 10 &&
                e.y > pausePanel.y + 230 && e.y < pausePanel.y + 230 + 50) {
                resume.sprite.loadTexture(resume.spriteOn.texture);
                setTimeout(() => {
                    game.paused = false;
                    while (pausePanel !== undefined) {
                        pausePanel.destroy();
                    }
                }, 100);
            } else if (e.x > pausePanel.x + 10 && e.x < pausePanel.x + pausePanel.width - 10 &&
                e.y > pausePanel.y + 168 && e.y < pausePanel.y + 168 + 50) {
                restart.sprite.loadTexture(restart.spriteOn.texture);
                game.paused = false;
                setTimeout(() => {
                    game.state.start('restarting');
                }, 100)
            }
        }
    },



    createQuestionBoard: function () {
        let data = game.cache.getJSON('questions');
        let questions = $.map(data, function (question) {
            return question;
        });

        for (let q of questions) {
            console.log(q);
        }

        let i = game.rnd.integerInRange(0, 1);

        let offset = 50;
        let questionBoard;
        this.slickUI.add(questionBoard = new SlickUI.Element.Panel(offset, offset, game.width - offset * 2, game.height - offset * 2));
        questionBoard.add(new SlickUI.Element.Text(0, 10, 'Question', 30)).centerHorizontally();
        questionBoard.add(new SlickUI.Element.Text(offset, 100, questions[i].question, 24));

        questionBoard.add(this.choiceA = new SlickUI.Element.Button(offset, 250, questionBoard.width - 2 * offset, 50));
        questionBoard.add(this.choiceB = new SlickUI.Element.Button(offset, 310, questionBoard.width - 2 * offset, 50));
        questionBoard.add(this.choiceC = new SlickUI.Element.Button(offset, 370, questionBoard.width - 2 * offset, 50));
        this.choiceA.add(this.textA = new SlickUI.Element.Text(0, 0, questions[i].choices.a)).center();
        this.choiceB.add(this.textB = new SlickUI.Element.Text(0, 0, questions[i].choices.b)).center();
        this.choiceC.add(this.textC = new SlickUI.Element.Text(0, 0, questions[i].choices.c)).center();

        questionBoard.add(this.closeButton = new SlickUI.Element.Button(10, 10, 30, 30));
        this.closeButton.add(new SlickUI.Element.Text(0, 0, 'X')).center();
        this.closeButton.events.onInputDown.add(() => {
            questionBoard.destroy();
            // this.createResultBoard();
        });
    },

    createResultBoard: function () {
        let offset = 100;
        let resultBoard;
        // this.slickUI.add(resultBoard = new SlickUI.Element.Panel();
    },

    updateKeys: function () {
        if (this.keys.up.isDown) {
            this.dog.moveUp();
        } else if (this.keys.down.isDown) {
            this.dog.moveDown();
        }

        if (this.keys.left.isDown) {
            this.dog.moveLeft();
        } else if (this.keys.right.isDown) {
            this.dog.moveRight();
        }

        if (this.keys.up.downDuration(1)) {
            this.dog.playWalkAnimation();
        } else if (this.keys.down.downDuration(1)) {
            this.dog.playWalkAnimation();
        }

        if (this.keys.left.downDuration(1)) {
            this.dog.playWalkAnimation();
        } else if (this.keys.right.downDuration(1)) {
            this.dog.playWalkAnimation();
        }

        if (this.dog.isWalking === false && !this.dog.isIdle) {
            this.dog.playIdleAnimation();
        }
    }
}
