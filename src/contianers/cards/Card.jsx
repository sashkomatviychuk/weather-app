import { fromPromise } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import { actions as cardsActions } from 'actions/cards';
import { actions as modalActions } from 'actions/modal';
import { dispatch } from 'store';
import { fetchWeather, processRequestResult } from 'helpers/weather';
import Card from 'components/cards/Card';

const propsMapper = props$ => {
    props$
        .filter(({ loaded }) => !loaded)
        .map(({ cityId, cityName }) => ({ cityId, cityName }))
        .flatMapLatest(params => fromPromise(fetchWeather(params)))
        .flatMapLatest(weather => fromPromise(processRequestResult(weather)))
        .filter(v => v)
        .onValue(card => {
            dispatch(cardsActions.updateCard(card));
            dispatch(modalActions.hideModal());
        });

    return props$.skipDuplicates().map(props => ({
        ...props,
        onRemove: () => props.onRemove(props.cityId),
    }));
}

export default compose(
    setDisplayName('WeatherCard'),
    mapPropsStream(propsMapper)
)(Card);