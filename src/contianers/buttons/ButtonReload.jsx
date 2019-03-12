import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { debounceTime } from 'rxjs/operators/debounceTime';

import IconButton from 'components/buttons/IconButton';
import { actions as cardsActions } from 'actions/cards';
import { dispatch } from 'store';
import { createEventHandler } from 'store/rx-helpers/index';
import { weatherList$ } from 'store/selectors/cards';
import connect from 'store/rx-helpers/connect';

const { handler: onClick, stream: reloads$ } = createEventHandler();

const subscription = reloads$.pipe(
    debounceTime(500),
    switchMap(() => weatherList$.pipe(take(1))),
    map(weatherList => weatherList.toJS())
)
    .subscribe(weatherList => dispatch(cardsActions.updateAllCards(weatherList)));

const mapObservablesToProps = props$ => ({
    observables: {},
    props: { onClick, icon: 'icon-reload' },
    unsubscribe() {
        subscription.unsubscribe();
    }
})

const Connected = connect(mapObservablesToProps)(IconButton);

Connected.displayName = 'ReloadCitiesButton';

export default Connected;