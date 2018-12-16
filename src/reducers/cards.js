import Immutable from 'immutable';
import { actionsTypes } from 'actions/cards';

let initialState = Immutable.fromJS({
    weatherList: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_CARD: {
            const newCard = action.card;
            const exists = state.get('weatherList').find(el => el.get('cityId') === newCard.cityId);

            if (exists) {
                return state;
            }

            return state.update('weatherList', list => list.push(Immutable.fromJS(newCard)));
        }
        
        case actionsTypes.UPDATE_ALL_CARDS: {
            return state.set('weatherList', Immutable.fromJS(action.cards));
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