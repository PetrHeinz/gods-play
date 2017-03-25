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

        let centerCoordinate = new CubeCoordinate(0, 0, 0)
        board.addCell(new Cell(centerCoordinate, getRandomCellType()))

        for (let radius = 1; radius <= boardSize; radius++) {
            let ring = centerCoordinate.getRing(radius)
            ring.forEach(function (coordinate) {
                board.addCell(new Cell(coordinate, getRandomCellType()))
            })
        }

        return board

        function getRandomCellType() {
            let randomIndex = Math.floor(Math.random() * Cell.getTypes().length)

            return Cell.getTypes()[randomIndex]
        }
    }

}
