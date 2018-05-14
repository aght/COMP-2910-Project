var boot = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.scale.pageAlignVertically = true;
        game.scale.pageAlignHorizontally = true;
        game.scale.enterIncorrectOrientation.add(this.handleOrientation);
        game.state.start('load');
    },

    handleOrientation: function () {
        alert('incorrect orientation');
    }
};
