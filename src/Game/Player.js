import InsufficientManaException from '../exceptions/InsufficientManaException'
import InsufficientActionPointsException from '../exceptions/InsufficientActionPointsException'

export default class Player {
  /**
   * @param {string} name
   * @param {string} color
   */
  constructor (name, color) {
    /** @type {string} */
    this.name = name

    /** @type {string} */
    this.color = color

    /** @type {Unit|null} */
    this.mage = null

    /** @type {number} */
    this.mana = 5

    /** @type {number} */
    this.actionPoints = 0
  }

  /**
   * @return {bool}
   */
  isActive () {
    return this.mage !== null
  }

  /**
   * @param {number} mana
   */
  addMana (mana) {
    this.mana += mana

    this.triggerMageEvent('playerGainedMana', {
      player: this,
      addedMana: mana
    })
  }

  /**
   * @param {number} mana
   */
  castSpell (mana) {
    if (this.actionPoints <= 0) {
      throw new InsufficientActionPointsException()
    }
    if (mana > this.mana) {
      throw new InsufficientManaException()
    }

    this.actionPoints--
    this.mana -= mana

    this.triggerMageEvent('playerCastedSpell', {
      player: this,
      usedMana: mana
    })
  }

  refresh () {
    this.actionPoints = 3

    this.triggerMageEvent('playerRefreshed', {
      player: this
    })
  }

  /**
   * @param {string} name
   * @param {*} data
   */
  triggerMageEvent (name, data) {
    if (this.mage !== null) {
      this.mage.events.trigger(name, data)
    }
  }
}
