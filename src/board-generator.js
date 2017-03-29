import Board from "./board"
import Cell from "./cell"
import CubeCoordinate from "./cube-coordinate"

export default class BoardGenerator {

    /**
     * @param {GameObjectFactory} gameObjectFactory
     */
    constructor(gameObjectFactory) {
        /** @type {GameObjectFactory} */
        this.gameObjectFactory = gameObjectFactory
    }

    /**
     * @param {number} boardSize
     * @return {Board}
     */
    generateBoard(boardSize) {
        let board = this.gameObjectFactory.create(Board, boardSize)

        let centerCoordinate = new CubeCoordinate(0, 0, 0)
        board.createChild(centerCoordinate, getRandomCellType())

        for (let radius = 1; radius <= boardSize; radius++) {
            let ring = centerCoordinate.getRing(radius)
            ring.forEach(function (coordinate) {
                board.createChild(coordinate, getRandomCellType())
            })
        }

        Math.floor(Math.random() * board.children.length)
        for (let i = 0; i < boardSize; i++) {
            board.removeChild(getRandomCell())
        }
        getRandomCell().createUnit()

        return board

        function getRandomCellType() {
            let randomIndex = Math.floor(Math.random() * Cell.getTypes().length)

            return Cell.getTypes()[randomIndex]
        }

        function getRandomCell() {
            let randomIndex = Math.floor(Math.random() * board.children.length)

            return board.children[randomIndex]
        }
    }

}
