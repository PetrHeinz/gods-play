export default class Board {

    /**
     * @param {number} size
     */
    constructor(size) {
        /** @type {number} */
        this.size = size

        /** @type {Cell[]} */
        this.cells = []
    }

    /**
     * @param {Cell} cell
     */
    addCell(cell) {
        this.cells.push(cell)
    }

    /**
     * @param {Cell} cell
     */
    hasCell(cell) {
        return this.cells.indexOf(cell) > -1;
    }

}
