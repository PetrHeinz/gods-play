import GameObject from "./game-object"

export default class Unit extends GameObject {

    /**
     * @param {Cell} cell
     */
    constructor(cell) {
        super()

        /** @type {Cell} */
        this.cell = cell
    }

    /**
     * @param {Cell} cell
     */
    moveTo(cell) {
        if (cell.unit !== null) {
            throw 'Error: Unit cannot be moved on Cell with assigned Unit'
        }
        if (!this.cell.hasNeighbor(cell)) {
            throw 'Error: Unit cannot be moved on non-neighboring Cell'
        }
        this.cell.unit = null
        this.cell = cell

        cell.unit = this
    }

}
