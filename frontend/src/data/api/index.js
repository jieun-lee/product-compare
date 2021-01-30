import axios from 'axios';

const BASE_URL ='http://localhost:5000';
const USERS_URL = `${BASE_URL}/users`;
const LISTS_URL = `${BASE_URL}/lists`;
const ITEMS_URL = `${BASE_URL}/items`;

// Users
export const createUser = (user) => axios.post(USERS_URL, user);
export const fetchUser = (username) => axios.get(`${USERS_URL}/${username}`);
export const updateUser = (userId, user) => axios.patch(`${USERS_URL}/${userId}`, user);
export const deleteUser = (userId) => axios.delete(`${USERS_URL}/${userId}`);

// Lists
export const fetchLists = (userId) => axios.get(`${USERS_URL}/${userId}/lists`);
export const createList = (list) => axios.post(LISTS_URL, list);
export const fetchList = (listId) => axios.get(`${LISTS_URL}/${listId}`);
export const updateList = (listId, list) => axios.patch(`${LISTS_URL}/${listId}`, list);
export const deleteList = (listId) => axios.delete(`${LISTS_URL}/${listId}`);

// Items
export const fetchItems = (listId) => axios.get(`${LISTS_URL}/${listId}/items`);
export const createItem = (item) => axios.post(ITEMS_URL, item);
export const fetchItem = (itemId) => axios.get(`${ITEMS_URL}/${itemId}`);
export const updateItem = (itemId, item) => axios.patch(`${ITEMS_URL}/${itemId}`, item);
export const deleteItem = (itemId) => axios.delete(`${ITEMS_URL}/${itemId}`);