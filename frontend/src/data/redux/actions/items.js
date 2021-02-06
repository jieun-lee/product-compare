import * as api from '../../api';

/**
 * Gets items for the given list
 * @param {string} listId
 */
export const fetchItems = (listId) => async (dispatch) => {
    try {
        const { data } = await api.fetchItems(listId);
        dispatch({ type: 'GET_ITEMS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Creates a new item
 * @param {Item} item
 */
export const createItem = (item) => async (dispatch) => {
    try {
        const { data } = await api.createItem(item);
        dispatch({ type: 'CREATE_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets item with the given itemId
 * @param {string} itemId
 */
export const fetchItem = (itemId) => async (dispatch) => {
    try {
        const { data } = await api.fetchItem(itemId);
        dispatch({ type: 'GET_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Updates item with the given itemId
 * @param {string} itemId
 * @param {Partial<Item>} item
 */
export const updateItem = (itemId, item) => async (dispatch) => {
    try {
        const { data } = await api.updateItem(itemId, item);
        dispatch({ type: 'UPDATE_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Deletes list with the given listId
 * @param {string} itemId
 */
export const deleteItem = (itemId) => async (dispatch) => {
    try {
        await api.deleteItem(itemId);
        dispatch({ type: 'DELETE_ITEM', payload: itemId });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Clears all items in the redux store
 */
export const clearItems = (dispatch) => {
    dispatch({ type: 'CLEAR_ITEMS' });
}