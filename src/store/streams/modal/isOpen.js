import { state$, store } from './../../index';

export default state$
    .map(state => state.getIn(['modal', 'isOpen']))
    .skipDuplicates()
    .toProperty(() => store.getState().getIn(['modal', 'isOpen']));