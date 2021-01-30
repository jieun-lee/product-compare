/**
 * Gets all lists from the store
 */
export const getLists = (state) => state.lists;

/**
 * Gets a list from the given listId
 * @param {string} listId
 */
export const getListById = (state, listId) => state.lists[listId];