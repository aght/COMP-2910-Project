class Multimap {
    constructor(game) {
        this.game = game;
        this.maps = new Map();
        this.layers = new Map();
        this.collisionLayers = [];
    }

    addTilemap(mapKey, width, height, tilesetKey, scrollDelta) {
        let map = this.game.add.tilemap(mapKey, width, height);
        map.addTilesetImage(tilesetKey);
        let layer = map.createLayer(0);
        layer.resizeWorld();

        if (scrollDelta === true || scrollDelta === false) {
            layer.renderSettings.enableScrollDelta = scrollDelta;
        }

        this.maps.set(mapKey, map);
        this.layers.set(mapKey, layer);
    }

    getMap(mapKey) {
        return this.maps.get(mapKey);
    }

    getLayer(mapKey) {
        return this.layers.get(mapKey);
    }

    scale(mapKey, factor) {
        this.layers.get(mapKey).setScale(factor, factor);
    }

    scaleAll(factor) {
        this.layers.forEach(function (value, key, map) {
            value.setScale(factor, factor);
        });
    }

    setCollisionBetween(mapKey, start, stop, collides) {
        let map = this.maps.get(mapKey);
        let layer = this.layers.get(mapKey);
        map.setCollisionBetween(start, stop, collides);
        // layer.debug = true;
        this.collisionLayers.push(layer);
    }

    setCollisionBetweenSets(mapKey, collides, ...sets) {
        for (let set of sets) {
            this.setCollisionBetween(mapKey, set.start, set.stop, collides);
        }
    }

    getCollisionLayers() {
        return this.collisionLayers;
    }
}
