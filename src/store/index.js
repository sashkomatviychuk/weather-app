import { stream, pool, constant } from 'kefir';
import Immutable from 'immutable';
import configureStore from './configureStore';

const createEventHandler = () => {
    const eventPoll = pool();

    return {
        stream: eventPoll.toProperty(),
        handler: e => eventPoll.plug(constant(e)),
    };
}

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(Immutable.Map(initialState));

const statePoll = pool();
const state$ = statePoll.toProperty();

statePoll.plug(stream((emitter) => {
    store.subscribe(() => emitter.emit(store.getState()));
}));

const dispatch = action => store.dispatch(action);

export {
    store,
    state$,
    dispatch,
    createEventHandler,
};