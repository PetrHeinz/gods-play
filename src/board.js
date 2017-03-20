class Board {

    /**
     * @param {number} size
     * @param {Cell[]} cells
     */
    constructor(size, cells) {
        /** @type {number} */
        this.size = size

        /** @type {Cell[]} */
        this.cells = cells
    }

    /**
     * @param {Cell} cell
     */
    hasCell(cell) {
        return this.cells.indexOf(cell) > -1;
    }

}
