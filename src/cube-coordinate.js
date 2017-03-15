var CubeCoordinate;

(function () {

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @constructor
     */
    CubeCoordinate = function (x, y, z) {

        /**
         * @member {number}
         */
        this.x = x;

        /**
         * @member {number}
         */
        this.y = y;

        /**
         * @member {number}
         */
        this.z = z;
    };

    /**
     * @type {CubeCoordinate}
     */
    CubeCoordinate.prototype.DIRECTION_NORTH_EAST = new CubeCoordinate(+1, 0, -1);
    CubeCoordinate.prototype.DIRECTION_SOUTH_EAST = new CubeCoordinate(+1, -1, 0);
    CubeCoordinate.prototype.DIRECTION_SOUTH = new CubeCoordinate(0, -1, +1);
    CubeCoordinate.prototype.DIRECTION_SOUTH_WEST = new CubeCoordinate(-1, 0, +1);
    CubeCoordinate.prototype.DIRECTION_NORTH_WEST = new CubeCoordinate(-1, +1, 0);
    CubeCoordinate.prototype.DIRECTION_NORTH = new CubeCoordinate(0, +1, -1);

    /**
     * @type {[CubeCoordinate]}
     */
    CubeCoordinate.prototype.directions = [
        CubeCoordinate.prototype.DIRECTION_NORTH_EAST,
        CubeCoordinate.prototype.DIRECTION_SOUTH_EAST,
        CubeCoordinate.prototype.DIRECTION_SOUTH,
        CubeCoordinate.prototype.DIRECTION_SOUTH_WEST,
        CubeCoordinate.prototype.DIRECTION_NORTH_WEST,
        CubeCoordinate.prototype.DIRECTION_NORTH
    ];

    /**
     * @param {CubeCoordinate} cubeCoordinate
     * @return {CubeCoordinate}
     */
    CubeCoordinate.prototype.add = function (cubeCoordinate) {
        return new CubeCoordinate(
            this.x + cubeCoordinate.x,
            this.y + cubeCoordinate.y,
            this.z + cubeCoordinate.z
        );
    };

    /**
     * @param {number} factor
     * @return {CubeCoordinate}
     */
    CubeCoordinate.prototype.scale = function (factor) {
        return new CubeCoordinate(
            this.x * factor,
            this.y * factor,
            this.z * factor
        );
    };

    /**
     * @param {number} radius
     * @return {[CubeCoordinate]}
     */
    CubeCoordinate.prototype.getRing = function (radius) {
        var ring = [];
        var cubeCoordinate = this.add(this.DIRECTION_NORTH_WEST.scale(radius));
        for (var directionIndex in this.directions) {
            var directionCubeCoordinate = this.directions[directionIndex];
            for (var j = 0; j < radius; j++) {
                ring.push(cubeCoordinate);
                cubeCoordinate = cubeCoordinate.add(directionCubeCoordinate);
            }
        }

        return ring;
    }

})();