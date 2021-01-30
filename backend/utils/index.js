/**
 * Converts an array to an object where the key is the id
 * @param {array} arr array of objects with an _id field for each object
 */
export const arrayToObject = (arr) => {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]._id] = arr[i];
    }
    return obj;
}