import HashMap from 'hashmap'

/**
 * @param {Array} left
 * @param {Array} right
 * @return {Array}
 */
export function difference (left, right) {
  return left.filter(item => right.indexOf(item) === -1)
}

/**
 * @param {Array} array
 * @return {Array}
 */
export function unique (array) {
  let seenMap = new HashMap()
  let uniqueArray = []

  array.forEach(function (item) {
    if (!seenMap.has(item)) {
      seenMap.set(item, true)
      uniqueArray.push(item)
    }
  })

  return uniqueArray
}
