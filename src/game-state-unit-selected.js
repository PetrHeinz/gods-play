class GameStateUnitSelected extends GameState {

    /**
     * @param {Unit} unit
     */
    constructor(unit) {
        super()

        /** @type {Unit} */
        this.unit = unit
    }

    /**
     * @param {Cell} cell
     * @return {GameState}
     */
    cellClick(cell) {
        this.unit.moveTo(cell)

        return new GameStateStandby()
    }

}
