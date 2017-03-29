import GameObject from "./game-object"
import Cell from "./cell";

export default class Board extends GameObject {

    /**
     * @param {number} size
     */
    constructor(size) {
        super()

        /** @type {number} */
        this.size = size

        /** @type {Cell[]} */
        this.cells = []

        /** @type {Object.<string, Cell>} */
        this.cellsByCoordinate = {}
    }

    /**
     * @param {CubeCoordinate} coordinate
     * @param {string} type
     * @return {Cell}
     */
    createCell(coordinate, type) {
        if (this.cellsByCoordinate.hasOwnProperty(coordinate)) {
            throw 'Error: Cell cannot be added to Board already having Cell on the same coordinate'
        }
        let distance = Math.max(Math.abs(coordinate.x), Math.abs(coordinate.y), Math.abs(coordinate.z))
        if (distance > this.size) {
            throw 'Error: Cell cannot be added to Board of insufficient size ' + this.size + ' (' + distance + ' needed)'
        }

        let cell = this.factory.create(Cell, coordinate, type)
        this.cells.push(cell)
        this.cellsByCoordinate[cell.coordinate] = cell

        let self = this
        let neighborCoordinates = cell.coordinate.getRing(1)
        neighborCoordinates.forEach(function (neighborCoordinate) {
            if (self.cellsByCoordinate.hasOwnProperty(neighborCoordinate)) {
                let neighbor = self.cellsByCoordinate[neighborCoordinate]

                cell.addNeighbor(neighbor)
                neighbor.addNeighbor(cell)
            }
        })

        return cell
    }

    /**
     * @param {Cell} cell
     * @return bool
     */
    hasCell(cell) {
        return this.cells.indexOf(cell) > -1
    }

}
