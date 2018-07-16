import { SHOW_MODAL, HIDE_MODAL } from './../actions/modal';

let initialState = {
    isOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isOpen: true,
            };

        case HIDE_MODAL:
            return {
                ...state,
                isOpen: false,
            };

        default:
            return state;
    }
}