/**
 * @param {Cell} cell
 * @return {boolean}
 */
export function hasUnit (cell) {
  return cell.unit !== null
}

/**
 * @param {Cell} cell
 * @return {boolean}
 */
export function hasUnitConfig (cell) {
  return cell.config.unitConfig !== null
}
