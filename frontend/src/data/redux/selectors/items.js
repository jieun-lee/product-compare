/**
 * Gets all items in the store (should be list-specific)
 */
export const getItems = (state) => state.items;

/**
 * Gets an item from the itemId
 * @param {*} state 
 * @param {*} itemId 
 */
export const getItemById = (state, itemId) => state.items[itemId];
