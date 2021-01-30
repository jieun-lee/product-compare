import { useSelector } from 'react-redux';

export const getUser = () => useSelector(
    (state) => state.users
);
