export default class CubeCoordinate {

    /**
     * @return {CubeCoordinate[]}
     */
    static get directions() {
        return [
            new CubeCoordinate(1, 0, -1),
            new CubeCoordinate(1, -1, 0),
            new CubeCoordinate(0, -1, 1),
            new CubeCoordinate(-1, 0, 1),
            new CubeCoordinate(-1, 1, 0),
            new CubeCoordinate(0, 1, -1),
        ]
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        /** @type {number} */
        this.x = x

        /** @type {number} */
        this.y = y

        /** @type {number} */
        this.z = z
    }

    /**
     * @param {CubeCoordinate} coordinate
     * @return {CubeCoordinate}
     */
    add(coordinate) {
        return new CubeCoordinate(
            this.x + coordinate.x,
            this.y + coordinate.y,
            this.z + coordinate.z
        )
    }

    /**
     * @param {number} factor
     * @return {CubeCoordinate}
     */
    scale(factor) {
        return new CubeCoordinate(
            this.x * factor,
            this.y * factor,
            this.z * factor
        )
    }

    /**
     * @param {number} radius
     * @return {[CubeCoordinate]}
     */
    getRing(radius) {
        let ring = []
        let coordinate = this.add(CubeCoordinate.directions[4].scale(radius))
        CubeCoordinate.directions.forEach(function (directionCoordinate) {
            for (let j = 0; j < radius; j++) {
                ring.push(coordinate)
                coordinate = coordinate.add(directionCoordinate)
            }
        })

        return ring
    }

    /**
     * @return {string}
     */
    toString() {
        return [this.x, this.y, this.z].join(',')
    }

}
