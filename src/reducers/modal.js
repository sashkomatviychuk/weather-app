import Immutable from 'immutable';
import { actionsTypes } from 'actions/modal';

let initialState = Immutable.fromJS({
    isOpen: false,
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.SHOW_MODAL: {
            return state.set('isOpen', true);
        }

        case actionsTypes.HIDE_MODAL: {
            return state.set('isOpen', false);
        }

        default:
            return state;
    }
}