import { fromPromise, constant } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import IconButton from 'components/buttons/IconButton';
import { actions as cardsActions } from 'actions/cards';
import { dispatch, createEventHandler } from 'store';
import cardsList$ from 'store/streams/cards/list';
import { fetchWeather, processRequestResult } from 'helpers/weather';

const { handler: onClick, stream: reloads$ } = createEventHandler();

reloads$.flatMapLatest(() => cardsList$.take(1))
    .flatMapLatest(list => fromPromise(Promise.all(list.map(fetchWeather))))
    .flatMapLatest(list => fromPromise(Promise.all(list.map(processRequestResult))))
    .map(list => list.filter(v => v))
    .onValue(cards => dispatch(cardsActions.updateAllCards(cards)));

const propsMapper = props$ => constant({
    onClick,
    icon: 'icon-reload',
});

export default compose(
    setDisplayName('ReloadCitiesButton'),
    mapPropsStream(propsMapper)
)(IconButton);