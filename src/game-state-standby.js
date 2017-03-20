class GameStateStandby extends GameState {

    /**
     * @param {Cell} cell
     * @return {GameState}
     */
    cellClick(cell) {
        cell.text = 'clicked'

        return this
    }

}
