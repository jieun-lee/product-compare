import { combineReducers } from 'redux';

import users from './users';
import lists from './lists';
import items from './items';

export default combineReducers({ users, lists, items });