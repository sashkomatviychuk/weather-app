import Immutable from 'immutable';
import configureStore from './configureStore';
import { getObservableStore$ } from './rx-helpers/index';

// configure store
const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(Immutable.Map(initialState));
// make store  observable
const observableStore$ = getObservableStore$(store);
// store dispatch helper
const dispatch = action => store.dispatch(action);

export {
    store,
    observableStore$,
    dispatch,
};