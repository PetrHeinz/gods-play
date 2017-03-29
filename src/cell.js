import GameObject from "./game-object"
import Unit from "./unit";

export default class Cell extends GameObject {

    /**
     * @return {string[]}
     */
    static getTypes() {
        return ['brick', 'grass', 'sand', 'stone', 'tree', 'water', 'wheat']
    }

    /**
     * @param {CubeCoordinate} coordinate
     * @param {string} type
     */
    constructor(coordinate, type) {
        super()

        if (Cell.getTypes().indexOf(type) === -1) {
            throw 'Error: Cell cannot be created with invalid type "' + type + '"'
        }
        if (coordinate.x + coordinate.y + coordinate.z !== 0) {
            throw 'Error: Cell cannot be created unless coordinates are on plane given by x + y + z = 0'
        }

        /** @type {CubeCoordinate} */
        this.coordinate = coordinate

        /** @type {string} */
        this.type = type

        /** @type {Unit|null} */
        this.unit = null

        /** @type {Cell[]} */
        this.neighbors = []
    }

    /**
     * @param {Cell} cell
     */
    addNeighbor(cell) {
        this.neighbors.push(cell)
    }

    /**
     * @param {Cell} cell
     * @return bool
     */
    hasNeighbor(cell) {
        return this.neighbors.indexOf(cell) > -1
    }

    /**
     * @param {Cell} neighbor
     */
    removeNeighbor(neighbor) {
        if (!this.hasNeighbor(neighbor)) {
            throw 'Error: Neighbor not found'
        }

        let index = this.neighbors.indexOf(neighbor)
        this.neighbors.splice(index, 1)

        if (neighbor.hasNeighbor(this)) {
            neighbor.removeNeighbor(this)
        }
    }

    /**
     * @return {Unit}
     */
    createUnit() {
        if (this.unit !== null) {
            throw 'Error: Unit cannot be created on Cell with assigned Unit'
        }

        return this.unit = this.createChild(Unit, this)
    }

}
