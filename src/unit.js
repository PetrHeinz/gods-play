import GameObject from "./game-object"

export default class Unit extends GameObject {

    /**
     * @param {Player} owner
     */
    constructor(owner) {
        super()

        /** @type {Player} */
        this.owner = owner
    }


    /**
     * @param {Cell} cell
     */
    moveTo(cell) {
        if (cell.unit !== null) {
            throw 'Error: Unit cannot be moved on Cell with assigned Unit'
        }
        if (!this.parent.hasNeighbor(cell)) {
            throw 'Error: Unit cannot be moved on non-neighboring Cell'
        }
        this.setParent(cell)
    }

    /**
     * @param {Cell} cell
     */
    setParent(cell) {
        if (this.parent !== null) {
            this.parent.unit = null
        }

        super.setParent(cell)

        this.parent.unit = this
    }

}
