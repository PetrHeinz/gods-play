export default class Cell {

    /**
     * @return {string[]}
     */
    static getTypes() {
        return ['brick', 'grass', 'sand', 'stone', 'tree', 'water', 'wheat']
    }

    /**
     * @param {CubeCoordinate} cubeCoordinate
     * @param {string} type
     */
    constructor(cubeCoordinate, type) {
        if (Cell.getTypes().indexOf(type) === -1) {
            throw 'Error: Cell cannot be created with invalid type "' + type + '"'
        }

        /** @type {CubeCoordinate} */
        this.cubeCoordinate = cubeCoordinate

        /** @type {string} */
        this.type = type

        /** @type {Unit|null} */
        this.unit = null
    }

}
