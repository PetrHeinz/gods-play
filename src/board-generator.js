class BoardGenerator {

    /**
     * @param {number} boardSize
     * @return {Board}
     */
    generateBoard(boardSize) {
        let centerCubeCoordinate = new CubeCoordinate(0, 0, 0)
        let cells = [new Cell(centerCubeCoordinate, getRandomCellType())]

        for (let radius = 1; radius <= boardSize; radius++) {
            let ring = centerCubeCoordinate.getRing(radius)
            ring.forEach(function (cubeCoordinate) {
                cells.push(new Cell(cubeCoordinate, getRandomCellType()))
            })
        }

        return new Board(boardSize, cells)

        function getRandomCellType() {
            let randomIndex = Math.floor(Math.random() * Cell.getTypes().length)

            return Cell.getTypes()[randomIndex]
        }
    }

}
