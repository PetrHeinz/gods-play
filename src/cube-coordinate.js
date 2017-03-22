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
     * @param {CubeCoordinate} cubeCoordinate
     * @return {CubeCoordinate}
     */
    add(cubeCoordinate) {
        return new CubeCoordinate(
            this.x + cubeCoordinate.x,
            this.y + cubeCoordinate.y,
            this.z + cubeCoordinate.z
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
        let cubeCoordinate = this.add(CubeCoordinate.directions[4].scale(radius))
        CubeCoordinate.directions.forEach(function (directionCubeCoordinate) {
            for (let j = 0; j < radius; j++) {
                ring.push(cubeCoordinate)
                cubeCoordinate = cubeCoordinate.add(directionCubeCoordinate)
            }
        })

        return ring;
    }

}
