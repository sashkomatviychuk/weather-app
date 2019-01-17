import { state$, store, getIn } from 'store';

const getIsOpen = getIn(['modal', 'isOpen'], false);

export default state$
    .map(getIsOpen)
    .toProperty(() => getIsOpen(store.getState()))
    .skipDuplicates();