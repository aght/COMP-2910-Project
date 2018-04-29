function AABB(minX, minY, maxX, maxY) {
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;

    this.contains = function(aabb) {
        let a = (this.minX <= aabb.minX && this.maxX >= aabb.maxX);
        let b = (this.minY <= aabb.minY && this.maxY >= aabb.maxY);
        console.log(a + " " + b);
        if (a && b) {
            return true;
        } else {
            return false;
        }
    }
}
