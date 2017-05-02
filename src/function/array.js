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

/**
 * @param {Array} array
 * @return {*}
 */
export function random (array) {
  let key = Math.floor(Math.random() * array.length)

  return array[key]
}

/**
 * @param {Array} array
 * @return {Array}
 */
export function shuffle (array) {
  array = array.slice()

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let item = array[i]
    array[i] = array[j]
    array[j] = item
  }

  return array
}
