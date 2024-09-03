import getGenerators from '../../generators/index.js';

/**
 * getPrioritizedGenerators - a function that retrieves a prioritized list of generators
 * @returns {Array} - an array of generator objects, sorted in descending order based on
 * the value of the `priorityIndex` property
 *
 * The function retrieves all generators from the "../generators/index.js" file, maps over
 * the entries of the generators object to create an array of objects with properties from
 * the value and the key, and sorts the array based on the `priorityIndex` property in
 * descending order.
 */
function getPrioritizedGenerators() {
  const arr = Object.entries(getGenerators()).map(([key, value]) => ({
    ...value,
    key,
  }));
  arr.sort((a, b) => b.priorityIndex - a.priorityIndex);
  return arr;
}

export default getPrioritizedGenerators;
