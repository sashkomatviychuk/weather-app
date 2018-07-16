import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import modal from './reducers/modal';
import cards from './reducers/cards';

export default function (initialState = {}) {
    const combined = combineReducers({
        modal,
        cards,
    });

    return createStore(
        combined,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f,
            persistState(undefined, { key: 'weather-app' })
        )
    );
}