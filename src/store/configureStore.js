import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { serialize, deserialize } from 'redux-localstorage-immutable';
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import Immutable from 'immutable';

import rootReducers from '../reducers';

export default (initialState = Immutable.Map({})) => {
    const reducer = compose(mergePersistedState(deserialize))(rootReducers);
    const storage = compose(serialize)(adapter(window.localStorage));

    return createStore(
        reducer,
        initialState,
        compose(
            persistState(storage, 'weather-app'),
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        )
    );
}