var width = window.innerWidth;
var height = window.innerHeight;

// KEY EVENTS
$(document).keydown(function (e) {
    Key.onKeydown(e);
});

$(document).keyup(function (e) {
    Key.onKeyup(e);
});

var Key = {
    _pressed_keys: {},

    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_UP: 38,
    KEY_DOWN: 40,

    isDown: function (keyCode) {
        return this._pressed_keys[keyCode];
    },

    onKeydown: function (event) {
        this._pressed_keys[event.keyCode] = true;
    },

    onKeyup: function (event) {
        delete this._pressed_keys[event.keyCode];
    }
};
// KEY EVENT END

// WINDOW EVENTS
$(window).resize(function () {
    width = window.innerWidth;
    height = window.innerHeight;
    app.renderer.resize(width, height);
});
// WINDOW EVENTS END
