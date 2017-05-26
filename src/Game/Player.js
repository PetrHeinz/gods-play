import InsufficientManaException from '../exceptions/InsufficientManaException'

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
  }

  /**
   * @param {number} mana
   */
  addMana (mana) {
    this.mana += mana

    this.triggerMageEvent('manaAdded', {
      player: this,
      addedMana: mana
    })
  }

  /**
   * @param {number} mana
   */
  useMana (mana) {
    if (mana > this.mana) {
      throw new InsufficientManaException()
    }

    this.mana -= mana

    this.triggerMageEvent('manaUsed', {
      player: this,
      usedMana: mana
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
