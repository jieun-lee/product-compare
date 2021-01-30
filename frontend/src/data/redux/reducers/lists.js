export default (state = [], action) => {
    switch (action.type) {
        case 'GET_LISTS':
            return action.payload;
        case 'CREATE_LIST':
            return [...state, action.payload];
        case 'GET_LIST':
        case 'UPDATE_LIST':
            return state.map((list) => list._id === action.payload._id ? action.payload : list);
        case 'DELETE_LIST':
            return state.filter((list) => list._id !== action.payload);
        default:
            return state;
    }
}