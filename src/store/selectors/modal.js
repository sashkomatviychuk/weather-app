import { map } from 'rxjs/operators';
import { observableStore$ } from '../index';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

export const isOpen$ = observableStore$.pipe(
    map(state => state.getIn(['modal', 'isOpen'], false)),
    distinctUntilChanged()
);