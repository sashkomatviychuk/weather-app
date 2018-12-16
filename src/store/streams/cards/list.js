import { state$, store } from './../../index';

export default state$
    .map(state => state.getIn(['cards', 'weatherList']).toJS())
    .skipDuplicates()
    .toProperty(() => store.getState().getIn(['cards', 'weatherList'], []).toJS());