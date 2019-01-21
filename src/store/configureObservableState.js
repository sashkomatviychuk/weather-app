import { pool, stream } from 'kefir';

function createState$(store) {
    return stream((emitter) => {
        store.subscribe(() => emitter.emit(store.getState()));
    }).toProperty(() => store.getState());
}

const statePool = pool();
const state$ = statePool.toProperty();
const createObservableState = store => statePool.plug(createState$(store));

export {
    state$,
    createObservableState
}
