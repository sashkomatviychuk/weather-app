import Immutable from 'immutable';
import configureStore from './configureStore';
import { state$, createObservableState } from './configureObservableState'

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(Immutable.Map(initialState));

createObservableState(store);

const dispatch = action => store.dispatch(action);
const getIn = (path, defaultValue) => state => state.getIn(path, defaultValue);

export {
    store,
    state$,
    dispatch,
    getIn,
};