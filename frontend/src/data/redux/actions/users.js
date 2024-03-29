import * as api from '../../api';

/**
 * Creates a new user with the given user data
 * @param {User} user
 */
export const createUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.createUser(user);
        dispatch({ type: 'CREATE_USER', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Gets user with the given username
 * @param {string} username
 */
export const fetchUser = (username) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(username);
        dispatch({ type: 'GET_USER', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Updates user with the given userId
 * @param {string} userId
 * @param {Partial<User>} user
 */
export const updateUser = (userId, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(userId, user);
        dispatch({ type: 'UPDATE_USER', payload: data });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Deletes user with the given userId
 * @param {string} userId
 */
export const deleteUser = (userId) => async (dispatch) => {
    try {
        await api.deleteUser(userId);
        dispatch({ type: 'DELETE_USER' });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Logs out the user by resetting the user in the store
 */
export const logoutUser = (dispatch) => {
    dispatch({ type: 'LOGOUT_USER' });
}