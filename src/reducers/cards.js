import Immutable from 'immutable';
import { actionsTypes } from 'actions/cards';

let initialState = Immutable.fromJS({
    weatherList: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_CARD: {
            const card = Immutable.fromJS(action.card);
            const exists = state.get('weatherList').find(
                el => el.get('cityId') === card.get('cityId')
            );

            if (exists) {
                return state;
            }

            return state.update('weatherList', list => list.push(card));
        }

        case actionsTypes.UPDATE_CARD: {
            const { cityId } = action.card;
            const weatherList = state.get('weatherList');
            const index = weatherList.findIndex(item => cityId === item.get('cityId'));

            if (index === -1) {
                return state;
            }

            return state.setIn(['weatherList', index], Immutable.fromJS(action.card));
        }
        
        case actionsTypes.UPDATE_ALL_CARDS: {
            const cards = action.cards.map(card => ({ ...card, loaded: false }));
            return state.set('weatherList', Immutable.fromJS(cards));
        }

        case actionsTypes.REMOVE_CARD: {
            return state.update(
                'weatherList', list => list.filter(el => el.get('cityId') !== action.cityId)
            );
        }

        default:
            return state;
    }
}