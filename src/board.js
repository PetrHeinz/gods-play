export default class Board {

    /**
     * @param {number} size
     */
    constructor(size) {
        /** @type {number} */
        this.size = size

        /** @type {Cell[]} */
        this.cells = []

        /** @type {Object} */
        this.cellsByCoordinate = {}
    }

    /**
     * @param {Cell} cell
     */
    addCell(cell) {
        if (this.cellsByCoordinate.hasOwnProperty(cell.coordinate)) {
            throw 'Error: Cell cannot be added to Board already having Cell on the same coordinate'
        }
        let distance = Math.max(Math.abs(cell.coordinate.x), Math.abs(cell.coordinate.y), Math.abs(cell.coordinate.z))
        if (distance > this.size) {
            throw 'Error: Cell cannot be added to Board of insufficient size ' + this.size + ' (' + distance + ' needed)'
        }

        this.cells.push(cell)
        this.cellsByCoordinate[cell.coordinate] = cell
    }

    /**
     * @param {Cell} cell
     */
    hasCell(cell) {
        return this.cells.indexOf(cell) > -1;
    }

}
