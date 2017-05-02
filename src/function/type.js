/**
 * @param {*} variable
 * @return {string}
 */
export function typename (variable) {
  return typeof variable === 'object' ? variable.constructor.name : typeof variable
}
