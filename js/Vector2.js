class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    setToPolar(azimuth, radius) {
        if (radius == null) {
            radius = 1;
        }

        this.x = Math.cos(azimuth) * radius;
        this.y = Math.sin(azimuth) * radius;

        return this;
    }
}
