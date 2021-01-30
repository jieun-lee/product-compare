export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_LISTS':
            return action.payload;
        case 'CREATE_LIST':
        case 'GET_LIST':
        case 'UPDATE_LIST':
            return {...state, ...action.payload};
        case 'DELETE_LIST':
            return {...state, [action.payload]: undefined};
        default:
            return state;
    }
}