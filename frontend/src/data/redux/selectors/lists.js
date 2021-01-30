import { useSelector } from 'react-redux';

export const getLists = () => useSelector(
    (state) => state.lists
);

export const getListById = (listId) => useSelector(
    (state) => state.lists.filter((list) => list._id === listId)[0] ?? undefined
);
