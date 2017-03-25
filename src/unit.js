export default class Unit {

    /**
     * @param {Cell} cell
     */
    constructor(cell) {
        /** @type {Cell} */
        this.cell = cell
    }

    /**
     * @param {Cell} cell
     */
    static createOn(cell) {
        if (cell.unit !== null) {
            throw 'Error: Unit cannot be created on Cell with assigned Unit'
        }

        return cell.unit = new Unit(cell)
    }

    /**
     * @param {Cell} cell
     */
    moveTo(cell) {
        if (cell.unit !== null) {
            throw 'Error: Unit cannot be moved on Cell with assigned Unit'
        }
        this.cell.unit = null
        this.cell = cell

        cell.unit = this
    }

}
