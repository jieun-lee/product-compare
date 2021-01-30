import * as api from '../../api';

/**
 * Gets lists for the given user
 * @param {string} userId
 */
export const getLists = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getLists(userId);
        dispatch({ type: 'GET_LISTS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Creates a new list
 * @param {List} list
 */
export const createList = (list) => async (dispatch) => {
    try {
        const { data } = await api.createList(list);
        dispatch({ type: 'CREATE_LIST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets list with the given listId
 * @param {string} listId
 */
export const getList = (listId) => async (dispatch) => {
    try {
        const { data } = await api.getList(listId);
        dispatch({ type: 'GET_LIST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Updates list with the given listId
 * @param {string} listId
 * @param {Partial<List>} list
 */
export const updateList = (listId, list) => async (dispatch) => {
    try {
        const { data } = await api.updateList(listId, list);
        dispatch({ type: 'UPDATE_LIST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Deletes user with the given userId
 * @param {string} listId
 */
export const deleteList = (listId) => async (dispatch) => {
    try {
        await api.deleteList(listId);
        dispatch({ type: 'DELETE_LIST', payload: listId });
    } catch (error) {
        console.log(error);
    }
}