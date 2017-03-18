class BoardGenerator {

    /**
     * @param {number} boardSize
     * @return {Board}
     */
    generateBoard(boardSize) {
        let centerCubeCoordinate = new CubeCoordinate(0, 0, 0)
        let cells = [new Cell(centerCubeCoordinate)]

        for (let radius = 1; radius <= boardSize; radius++) {
            let ring = centerCubeCoordinate.getRing(radius)
            ring.forEach(function (cubeCoordinate) {
                cells.push(new Cell(cubeCoordinate))
            })
        }

        return new Board(boardSize, cells)
    }

}
