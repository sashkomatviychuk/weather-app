import { combineReducers } from 'redux-immutable';

import cards from './cards';
import modal from './modal';

export default combineReducers({
    cards,
    modal,
});