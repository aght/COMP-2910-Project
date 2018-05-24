var play = {
    preload: function () {
        this.slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        this.slickUI.load('./assets/ui/kenney-theme/kenney.json');
        this.questions = this.loadQuestions();
        score = 1;
        answered = 0;
        scoreText.value = "Score: " + score.toString();
        game.stage.backgroundColor = '#000000';
    },

    create: function () {
        this.intenseMusic = false;

        this.questionPeople = [];

        bgm.play();

        this.cats = [];

        this.map = new Multimap(game);

        this.createMap();

        this.dog = new Dog(game, 2500, 200);

        let minX = 40;
        let maxX = game.world.width - 40;
        let minY = 40;
        let maxY = game.world.height - 40;

        for (let i = 0; i < questions.length; i++) {
            let sprites = ["blacksmith", "goldsmith", "woodcutter"];
            let x = game.rnd.integerInRange(minX, maxX);
            let y = game.rnd.integerInRange(minY, maxY);
            let j = game.rnd.integerInRange(0, sprites.length - 1);
            let npc = new QuestionNPC(game, x, y, sprites[j]);
            npc.events.onInputDown.add(() => {
                this.createQuestionBoard();
                bgm.pause();
                qbgm.play();
            });
            this.questionPeople.push(npc);
        }

        this.woodcutter = new QuestionNPC(game, this.dog.body.x + 200, this.dog.body.y, 'woodcutter', this.questions);
        this.woodcutter.wanderRadius = 200;

        let pr = new PhysicsResize(game);
        pr.resizePolygon('dog_physics_right', 'dog_physics_right_scaled', 'Right', this.dog.scaling);
        pr.resizePolygon('dog_physics_left', 'dog_physics_left_scaled', 'Left', this.dog.scaling);
        this.dog.body.clearShapes();
        this.dog.body.loadPolygon('dog_physics_right_scaled', 'Right');
        this.dog.inputEnabled = true;
        this.woodcutter.events.onInputDown.add(() => {
            this.createQuestionBoard();
            bgm.pause();
            qbgm.play();
        })

        this.createButtons();
        game.input.onDown.add(this.pauseMenuEvents, self);

        countdown = new CountdownTimer(10, 10, '2:00', 16);
        countdown.flashOnComplete = true;
        countdown.onComplete(() => {
            if (usedIndices.length === 25) {
                game.state.start('win');
            } else {
                // game.state.start('lose');
                game.state.start('win');
            }
            
            bgm.pause();
            qbgm.pause();
        });
        this.slickUI.add(countdown.text);

        this.slickUI.add(scoreText = new SlickUI.Element.Text(10, 30, ("Score: " + score.toString()), 16));
        countdown.start();

        this.slickUI.add(answeredText = new SlickUI.Element.Text(10, 50, "Answered: " + answered.toString()), 16);

        game.world.setBounds(0, 0, TILE_SIZE * TILES_X, TILE_SIZE * TILES_Y);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        this.keys = game.input.keyboard.createCursorKeys();
        game.camera.follow(this.dog, Phaser.Camera.FOLLOW_LOCKON, 0.08, 0.08);

        this.spawn = game.add.sprite(2702, 350, 'spawn');
        game.physics.p2.enable(this.spawn);
        this.spawn.body.kinematic = true;
        this.spawn.inputEnabled = true;
        this.spawn.events.onInputDown.add(() => {
            this.cats.push(new Cat(game, 0, 0));
        });

        stick = pad.addStick(10, 10, 110, 'arcade');
        stick.scale = 0.7;
        stick.alignBottomLeft(40);
    },

    update: function () {
        this.spawn.body.setZeroVelocity();
        this.dog.body.setZeroVelocity();
        this.updateKeys();
        this.updateJoystick();
        if (this.cats.length !== 0) {
            for (let cat of this.cats) {
                cat.seek(this.dog, 50, 250, 150, 300);
            }
        }

        for (let npc of this.questionPeople) {
            npc.wander(100, 60);
        }
        this.woodcutter.wander(100, 60);

        if (this.dog.isWalking === false && !this.dog.isIdle) {
            this.dog.playIdleAnimation();
        }
    },

    createMap: function () {
        if (mobileTester.isMobile()) {
            this.map.addTilemap('26', 16, 16, 'New1', true);
            this.map.addTilemap('27', 16, 16, 'New1', true);
            this.map.addTilemap('28', 16, 16, 'Lion', true);
            this.map.addTilemap('29', 16, 16, 'New1', true);
            this.map.addTilemap('30', 16, 16, 'New1', true);
            this.map.addTilemap('31', 16, 16, 'StoneHill', true);
            this.map.addTilemap('32', 16, 16, 'TallGrass', true);
            this.map.addTilemap('33', 16, 16, 'New1', true);
            this.map.addTilemap('20', 16, 16, 'Lion', true);
            this.map.addTilemap('4', 16, 16, 'Lion', true);
        } else {
            this.map.addTilemap('1', 16, 16, 'New1', true);
            this.map.addTilemap('2', 16, 16, 'New1', true);
            this.map.addTilemap('3', 16, 16, 'New1', true);
            this.map.addTilemap('4', 16, 16, 'Lion', true);
            this.map.addTilemap('5', 16, 16, 'Palace', true);
            this.map.addTilemap('6', 16, 16, 'Palace', true);
            this.map.addTilemap('7', 16, 16, 'House', true);
            this.map.addTilemap('8', 16, 16, 'House', true);
            this.map.addTilemap('9', 16, 16, 'New1', true);
            this.map.addTilemap('10', 16, 16, 'New1', true);
            this.map.addTilemap('11', 16, 16, 'New1', true);
            this.map.addTilemap('12', 16, 16, 'GrassHill', true);
            this.map.addTilemap('13', 16, 16, 'GrassHill', true);
            this.map.addTilemap('14', 16, 16, 'TallGrass', true);
            this.map.addTilemap('15', 16, 16, 'TallGrass', true);
            this.map.addTilemap('16', 16, 16, 'TallGrass', true);
            this.map.addTilemap('17', 16, 16, 'StoneHill', true);
            this.map.addTilemap('18', 16, 16, 'New1', true);
            this.map.addTilemap('19', 16, 16, 'BushTrees', true);
            this.map.addTilemap('20', 16, 16, 'Lion', true);
            this.map.addTilemap('21', 16, 16, 'House', true);
            this.map.addTilemap('23', 16, 16, 'BushTrees', true);
            this.map.addTilemap('24', 16, 16, 'Boat', true);
            this.map.addTilemap('25', 16, 16, 'Diamond', true);
    
            this.map.addCollisionMap('collision');
            this.map.addCollisionMapLayer('Collission');
        }
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
            if (!isPaused) {
                isPaused = true;
                this.createPauseMenu();
                setTimeout(() => {
                    countdown.pause();
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
                isPaused = false;
                game.paused = false;
                pausePanel.destroy();
                countdown.resume();
            } else if (e.x > pausePanel.x + 10 && e.x < pausePanel.x + pausePanel.width - 10 &&
                e.y > pausePanel.y + 168 && e.y < pausePanel.y + 168 + 50) {
                restart.sprite.loadTexture(restart.spriteOn.texture);
                game.paused = false;
                setTimeout(() => {
                    isPaused = false;
                    bgm.pause();
                    tbgm.pause();
                    qbgm.pause();
                    pad.removeStick(stick);
                    game.state.start('restarting');
                }, 100)
            }
        }
    },

    loadQuestions: function () {
        let data = game.cache.getJSON('questions');
        let questions = $.map(data, function (e) {
            return e;
        });

        return questions;
    },

    pickRandomQuestion: function (questions) {
        if (usedIndices.length === questions.length) {
            usedIndices = [];
        }
        // console.log(usedIndices.length + " " + questions.length);
        let i = game.rnd.integerInRange(0, questions.length - 1);
        while (usedIndices.includes(i)) {
            i = game.rnd.integerInRange(0, questions.length - 1);
        }
        return {
            q: questions[i],
            i: i
        }
    },

    createQuestionBoard: function () {
        let pick = this.pickRandomQuestion(this.questions);
        let q = pick.q;
        let g = pick.i;
        let a = q.answer;

        stick.visible = false;

        let offset = 50;
        let questionBoard, textA, textB, textC, choiceA, choiceB, choiceC, closeButton;
        this.slickUI.add(questionBoard = new SlickUI.Element.Panel(offset, offset, game.width - offset * 2, game.height - offset * 2));
        questionBoard.add(new SlickUI.Element.Text(0, 10, 'Question', 30)).centerHorizontally();
        questionBoard.add(new SlickUI.Element.Text(offset, 100, q.question, 24));

        questionBoard.add(choiceA = new SlickUI.Element.Button(offset, 250, questionBoard.width - 2 * offset, 50));
        questionBoard.add(choiceB = new SlickUI.Element.Button(offset, 310, questionBoard.width - 2 * offset, 50));
        questionBoard.add(choiceC = new SlickUI.Element.Button(offset, 370, questionBoard.width - 2 * offset, 50));

        choiceA.add(textA = new SlickUI.Element.Text(0, 0, q.choices.a)).center();
        choiceB.add(textB = new SlickUI.Element.Text(0, 0, q.choices.b)).center();
        if (q.choices.c) {
            choiceC.add(textC = new SlickUI.Element.Text(0, 0, q.choices.c)).center();
        }


        choiceA.events.onInputDown.add(() => {
            this.createResultBoard(this.validateAnswer('a', a), g);
            questionBoard.destroy();
        });
        choiceB.events.onInputDown.add(() => {
            this.createResultBoard(this.validateAnswer('b', a), g);
            questionBoard.destroy();
        });
        if (q.choices.c) {
            choiceC.events.onInputDown.add(() => {
                this.createResultBoard(this.validateAnswer('c', a), g);
                questionBoard.destroy();
            });
        }


        questionBoard.add(closeButton = new SlickUI.Element.Button(10, 10, 30, 30));
        closeButton.add(new SlickUI.Element.Text(0, 0, 'X')).center();
        closeButton.events.onInputDown.add(() => {
            questionBoard.destroy();
            stick.visible = true;
            qbgm.pause();
            bgm.resume();
        });
    },

    createResultBoard: function (result, index) {
        if (result === true) {
            score += 250;
            scoreText.value = "Score: " + score.toString();
            usedIndices.push(index);
            answered++;
            answeredText.value = "Answered: " + answered.toString();
        } else if (result === false) {
            score -= 50;
            scoreText.value = "Score: " + score.toString();
        }

        stick.visible = false;
        let offset = 100;
        let resultBoard;
        this.slickUI.add(resultBoard = new SlickUI.Element.Panel(game.width / 2 - 150, game.height / 2 - 150, 300, 300));
        resultBoard.add(new SlickUI.Element.Text(0, 50, result === true ? 'Correct!' : 'Wrong!', 32)).centerHorizontally();
        resultBoard.add(new SlickUI.Element.Text(0, 100, result === true ? '+250' : '-50', 24)).centerHorizontally();
        let close;
        resultBoard.add(close = new SlickUI.Element.Button(10, 230, 270, 50));
        close.add(new SlickUI.Element.Text(0, 0, 'Close')).center();
        close.events.onInputDown.add(() => {
            setTimeout(() => {
                resultBoard.destroy();
                stick.visible = true;
                qbgm.pause();
                bgm.resume();
            }, 50);
        });
    },

    validateAnswer: function (answer, qAnswer) {
        return answer === qAnswer;
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
    },

    velocityFromRotation: function (rotation, speed, vec2) {
        if (speed === undefined) {
            speed = 60;
        }
        if (vec2 === undefined) {
            vec2 = new Vector2(0, 0);
        }

        return vec2.setToPolar(rotation, speed);
    },

    updateJoystick: function () {
        if (stick.isDown) {
            let vel = this.velocityFromRotation(stick.rotation, 400, new Vector2(this.dog.body.velocity.x, this.dog.body.velocity.y));
            this.dog.body.velocity.x = vel.x;
            this.dog.body.velocity.y = vel.y;
            this.dog.isWalking = true;
            if (stick.quadrant === 2 || stick.quadrant === 3) {
                this.dog.scale.x = -this.dog.scaling;
                if (!this.dog.isWalkingLeft) {
                    this.dog.playWalkAnimation();
                }
            } else if (stick.quadrant === 0 || stick.quadrant === 1) {
                this.dog.scale.x = this.dog.scaling;
                if (!this.dog.isWalkingRight) {
                    this.dog.playWalkAnimation();
                }
            }
        }
    },
}
