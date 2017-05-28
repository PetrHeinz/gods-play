import Unit from './Unit'

export default class Mage extends Unit {
  die () {
    let originalBoard = this.parent.parent

    super.die()
    this.owner.mage = null

    originalBoard.getUnitsOwnedBy(this.owner)
      .forEach(unit => unit.die())

    this.events.trigger('playerLost', {
      player: this.owner
    })
  }
}
