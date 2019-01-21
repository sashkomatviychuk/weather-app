import { constant } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import IconButton from 'components/buttons/IconButton';
import { actions as cardsActions } from 'actions/cards';
import { dispatch } from 'store';
import { createEventHandler } from 'store/helpers';
import { weatherList$ } from 'store/streams/cards';

const { handler: onClick, stream: reloads$ } = createEventHandler();

reloads$.debounce(500).flatMapLatest(() => weatherList$.take(1))
    .map(weatherList => weatherList.toJS())
    .onValue(weatherList => dispatch(cardsActions.updateAllCards(weatherList)));

const propsMapper = props$ => constant({
    onClick,
    icon: 'icon-reload',
});

export default compose(
    setDisplayName('ReloadCitiesButton'),
    mapPropsStream(propsMapper)
)(IconButton);