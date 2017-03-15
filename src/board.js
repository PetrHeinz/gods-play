var Board;

(function () {

    /**
     * @param {number} size
     * @param {Cell[]} cells
     * @constructor
     */
    Board = function (size, cells) {

        /**
         * @member {number}
         */
        this.size = size;

        /**
         * @member {Cell[]}
         */
        this.cells = cells;
    };

})();