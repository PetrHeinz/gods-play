export default class Cell {

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
    }

}
