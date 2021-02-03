const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return action.payload;
        case 'GET_USER':
            return action.payload;
        case 'UPDATE_USER':
            return action.payload;
        case 'DELETE_USER':
        case 'LOGOUT_USER':
            return {};
        default:
            return state;
    }
}

export default reducer;