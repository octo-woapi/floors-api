/**
 * Async version of array.find
 * @param {Array} array - The array to search into
 * @param {function(T, number, object): boolean} predicate - The predicate to
 * apply
 * @return {Promise<T>} A promise resolving to the element found, or rejecting
 * to an error if the element is missing.
 */
const arrayFindAsync = (array, predicate) => {
  return new Promise((resolve, reject) => {
    const elt = array.find(predicate);
    if (elt === undefined) {
      return reject({
        message: 'Element not found',
      });
    }
    resolve(elt);
  });
};

module.exports = {
  arrayFindAsync,
};
