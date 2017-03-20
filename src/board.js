class Board {

    /**
     * @param {number} size
     * @param {Cell[]} cells
     */
    constructor(size, cells) {
        this.size = size
        this.cells = cells
    }

    /**
     * @param {Cell} cell
     */
    hasCell(cell) {
        return this.cells.indexOf(cell) > -1;
    }

}
