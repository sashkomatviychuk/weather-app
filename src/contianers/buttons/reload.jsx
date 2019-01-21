import { constant } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import IconButton from 'components/buttons/IconButton';
import { actions as cardsActions } from 'actions/cards';
import { dispatch, createEventHandler } from 'store';
import { weatherList$ } from 'store/streams/cards';

const { handler: onClick, stream: reloads$ } = createEventHandler();

reloads$.debounce(500).flatMapLatest(() => weatherList$.take(1))
    .onValue(cards => dispatch(cardsActions.updateAllCards(cards)));

const propsMapper = props$ => constant({
    onClick,
    icon: 'icon-reload',
});

export default compose(
    setDisplayName('ReloadCitiesButton'),
    mapPropsStream(propsMapper)
)(IconButton);