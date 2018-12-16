export const actionsTypes = {
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
};

export const actions = {
    showModal: () => ({ type: actionsTypes.SHOW_MODAL }),
    hideModal: () => ({ type: actionsTypes.HIDE_MODAL }),
}