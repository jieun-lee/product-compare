import * as api from '../../api';

/**
 * Creates a new item for the given list with the given item data
 * @param {string} listId
 * @param {Item} item
 */
export const createItem = (listId, item) => async (dispatch) => {
    try {
        const { data } = await api.createItem(listId, item);
        dispatch({ type: 'CREATE_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets item with the given itemId
 * @param {string} itemId
 */
export const getItem = (itemId) => async (dispatch) => {
    try {
        const { data } = await api.getItem(itemId);
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