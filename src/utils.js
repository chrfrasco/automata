/**
 * Count the number of times a value appears in an array
 *
 * @param {T} target Element to search for
 * @param {T[]} values Array to searc
 * @returns {number}
 */
module.exports.countOccurrences = function countOccurrences(target, values) {
  let count = 0;
  for (const value of values) {
    if (value === target) count++;
  }
  return count;
};

/**
 * Throw an error if a required parameter is missing
 *
 * @param {string} name name of the required param
 */
module.exports.requiredParameter = function requiredParameter(name) {
  throw new TypeError(`missing param ${name}`);
};

/**
 * @param {T[]} first
 * @param {T[]} second
 */
module.exports.intersection = function intersection(first, second) {
  return first.filter(el => second.includes(el));
};
