var Cell;

(function () {

    /**
     * @param {CubeCoordinate} cubeCoordinate
     * @constructor
     */
    Cell = function (cubeCoordinate) {

        /**
         * @member {CubeCoordinate}
         */
        this.cubeCoordinate = cubeCoordinate;

        /**
         * @member {string}
         */
        this.text = '';
    };

})();