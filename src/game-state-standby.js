import GameState from "./game-state"
import GameStateUnitSelected from "./game-state-unit-selected"

export default class GameStateStandby extends GameState {

    /**
     * @param {Cell} cell
     * @return {GameState}
     */
    cellClick(cell) {
        let unit = cell.unit

        return unit !== null ? new GameStateUnitSelected(unit) : this
    }

}
