class Unit {

    /**
     * @param {Cell} cell
     */
    static createOn(cell) {
        if (cell.unit !== null) {
            throw 'Error: Unit cannot be created on Cell with assigned Unit'
        }
        let unit = new Unit()
        unit.cell = cell
        cell.unit = unit

        return unit
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
