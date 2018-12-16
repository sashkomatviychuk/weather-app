export const actionsTypes = {
    ADD_CARD: 'ADD_CARD',
    UPDATE_ALL_CARDS: 'UPDATE_ALL_CARDS',
    UPDATE_CARD: 'UPDATE_CARD',
    REMOVE_CARD: 'REMOVE_CARD',
};

export const actions = {
    addCard: card => ({
        type: actionsTypes.ADD_CARD,
        card,
    }),
    updateCard: card => ({
        type: actionsTypes.UPDATE_CARD,
        card,
    }),
    updateAllCards: cards => ({
        type: actionsTypes.UPDATE_ALL_CARDS,
        cards,
    }),
    removeCard: cityId => ({
        type: actionsTypes.REMOVE_CARD,
        cityId,
    }),
};