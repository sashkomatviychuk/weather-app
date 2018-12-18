import { fromPromise } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import { actions as cardsActions } from 'actions/cards';
import { dispatch } from 'store';
import { fetchWeather, processRequestResult, comparator } from 'helpers/weather';
import Card from 'components/cards/Card';

const propsMapper = props$ => {
    props$
        .filter(({ loaded }) => !loaded)
        .map(({ cityId, cityName }) => ({ cityId, cityName }))
        .flatMapLatest(params => fromPromise(fetchWeather(params)))
        .flatMapLatest(weather => fromPromise(processRequestResult(weather)))
        .filter(v => v)
        .onValue(card => dispatch(cardsActions.updateCard(card)));

    return props$
        .skipDuplicates(comparator)
        .map(props => props);
}

export default compose(
    setDisplayName('WeatherCard'),
    mapPropsStream(propsMapper)
)(Card);