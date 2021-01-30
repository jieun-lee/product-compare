import { combineReducers } from 'redux';

import user from './user';
import lists from './lists';
import items from './items';

export default combineReducers({ user, lists, items });