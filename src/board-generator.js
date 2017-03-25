import Board from "./board"
import Cell from "./cell"
import CubeCoordinate from "./cube-coordinate"

export default class BoardGenerator {

    /**
     * @param {number} boardSize
     * @return {Board}
     */
    generateBoard(boardSize) {
        let board = new Board(boardSize)

        let centerCubeCoordinate = new CubeCoordinate(0, 0, 0)
        board.addCell(new Cell(centerCubeCoordinate, getRandomCellType()))

        for (let radius = 1; radius <= boardSize; radius++) {
            let ring = centerCubeCoordinate.getRing(radius)
            ring.forEach(function (cubeCoordinate) {
                board.addCell(new Cell(cubeCoordinate, getRandomCellType()))
            })
        }

        return board

        function getRandomCellType() {
            let randomIndex = Math.floor(Math.random() * Cell.getTypes().length)

            return Cell.getTypes()[randomIndex]
        }
    }

}
