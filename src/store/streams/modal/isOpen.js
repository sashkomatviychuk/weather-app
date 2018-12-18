import { state$, store } from './../../index';

export default state$
    .map(state => state.getIn(['modal', 'isOpen']))
    .toProperty(() => store.getState().getIn(['modal', 'isOpen'], false))
    .skipDuplicates();