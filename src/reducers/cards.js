import { ADD_CARD, REMOVE_CARD, UPDATE_ALL_CARDS } from './../actions/cards';

let initialState = {
    weatherList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD: {
            const newCard = action.card;
            const weatherList = JSON.parse(JSON.stringify(state.weatherList));
            const exists = weatherList.findIndex(item => item.cityId === newCard.cityId);

            if (exists !== -1) {
                return state;
            }

            weatherList.push(newCard);

            return {
                ...state,
                weatherList,
            };
        }
        
        case UPDATE_ALL_CARDS: {
            const weatherList = action.cards;

            return {
                ...state,
                weatherList,
            };
        }

        case REMOVE_CARD: {
            const cityId = action.cityId;
            const withoutRemoved = state.weatherList.filter(
                item => item.cityId !== cityId
            );

            return {
                ...state,
                weatherList: withoutRemoved,
            };
        }

        default:
            return state;
    }
}