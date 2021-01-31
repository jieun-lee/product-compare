/**
 * Gets the user in the store
 */
export const getUser = (state) => state.user?._id ? state.user : undefined;
