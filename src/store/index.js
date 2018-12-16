import { stream, pool, constant } from 'kefir';
import Immutable from 'immutable';
import configureStore from './configureStore';
import { state$, statePoll } from './kefir/stream';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(Immutable.Map(initialState));

statePoll.plug(stream((emitter) => {
    store.subscribe(() => emitter.emit(store.getState()));
}));

const dispatch = action => store.dispatch(action);

const createEventHandler = () => {
    const eventPoll = pool();

    return {
        stream: eventPoll.toProperty(),
        handler: e => eventPoll.plug(constant(e)),
    };
}

export {
    store,
    state$,
    dispatch,
    createEventHandler,
};