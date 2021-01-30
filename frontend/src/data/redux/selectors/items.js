import { useSelector } from 'react-redux';

export const getItems = () => useSelector(
    (state) => state.items
);

export const getItemById = (itemId) => useSelector(
    (state) => state.items.filter((item) => item._id === itemId)[0] ?? undefined
);
