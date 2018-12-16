export const actionsTypes = {
    ADD_CARD: 'ADD_CARD',
    REMOVE_CARD: 'REMOVE_CARD',
    UPDATE_ALL_CARDS: 'UPDATE_ALL_CARDS',
};

export const actions = {
    addNewCity: card => ({
        type: actionsTypes.ADD_CARD,
        card,
    }),
    removeCity: cityId => ({
        type: actionsTypes.REMOVE_CARD,
        cityId,
    }),
    updateAllCards: cards => ({
        type: actionsTypes.UPDATE_ALL_CARDS,
        cards,
    }),
};