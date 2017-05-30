/**
 * @param {Cell} cell
 * @return {bool}
 */
export function hasUnit (cell) {
  return cell.unit !== null
}

/**
 * @param {Cell} cell
 * @return {bool}
 */
export function hasUnitConfig (cell) {
  return cell.config.unitConfig !== null
}
