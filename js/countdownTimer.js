class CountdownTimer {
    constructor(x, y, startTime, fontSize) {
        this.text = new SlickUI.Element.Text(x, y, "Time Left: " + startTime, fontSize || 16);

        this._callback = null;
        this._startTime = startTime;

        this.flashOnComplete = false;
        this.flashDuration = 3000;
        this.flashSpeed = 400;

        this.minutes = 0;
        this.seconds = 0;

        this.reset();
    }

    onComplete(callback) {
        this._callback = callback;
    }

    start() {
        if (this.minutes === 0 && this.seconds === 0) {
            return;
        }

        this.interval = setInterval(() => {
            --this.seconds;

            if (this.seconds === -1) {
                --this.minutes;
                this.seconds = 59;
            }

            let minutes = this.minutes;
            let seconds = (this.seconds < 10) ? ('0' + this.seconds) : this.seconds;
            this.text.value = "Time Left: " + minutes + ":" + seconds;

            if (this.minutes === 0 && this.seconds === 0) {
                clearInterval(this.interval);

                if (this._callback) {
                    this._callback();
                }

                if (this.flashOnComplete) {
                    this._flash();
                }

            }
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.reset(this.minutes + ":" + this.seconds);
    }

    resume() {
        this.start();
    }

    getSeconds() {
        return this.minutes * 60 + this.seconds;
    }

    reset(time) {
        let str = time ? time.split(':') : this._startTime.split(':');
        this.minutes = parseInt(str[0]);
        this.seconds = parseInt(str[1]);
    }

    _flash() {
        let isVisible = true;
        let flashInterval = setInterval(() => {
            isVisible = !isVisible;
            if (isVisible) {
                this.text.value = 'Time Left: 0:00';
            } else {
                this.text.value = '';
            }
        }, this.flashSpeed);

        setTimeout(() => {
            clearInterval(flashInterval);
            this.text.value = 'Time Left: 0:00';
        }, this.flashDuration);
    }
}
