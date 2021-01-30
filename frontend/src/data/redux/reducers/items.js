export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return action.payload;
        case 'CREATE_ITEM':
            return [...state, action.payload];
        case 'GET_ITEM':
        case 'UPDATE_ITEM':
            return state.map((item) => item._id === action.payload._id ? action.payload : item);
        case 'DELETE_ITEM':
            return state.filter((item) => item._id !== action.payload);
        default:
            return state;
    }
}
