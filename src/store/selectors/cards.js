import { map } from 'rxjs/operators';
import { observableStore$ } from '../index';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

export const weatherList$ = observableStore$.pipe(
    map(state => state.getIn(['cards', 'weatherList'], [])),
    distinctUntilChanged()
);