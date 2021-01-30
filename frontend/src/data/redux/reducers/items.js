export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return action.payload;
        case 'CREATE_ITEM':
        case 'GET_ITEM':
        case 'UPDATE_ITEM':
            return {...state, ...action.payload};
        case 'DELETE_ITEM':
            return {...state,[action.payload]: undefined};
        default:
            return state;
    }
}
