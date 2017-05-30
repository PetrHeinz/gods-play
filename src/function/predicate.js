/**
 * @param {function} predicate
 * @return {function}
 */
export function not (predicate) {
  return (...parameters) => !predicate(...parameters)
}
