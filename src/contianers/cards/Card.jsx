import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { actions as cardsActions } from 'actions/cards';
import { dispatch } from 'store';
import { fetchWeather, processRequestResult, comparator } from 'helpers/weather';
import Card from 'components/cards/Card';
import connect from 'store/rx-helpers/connect';

const onRemove = cityId => {
    if (window.confirm('Remove this city from list?')) {
        dispatch(cardsActions.removeCard(cityId));
    }
}

const filterLoaded = ({ card }) => !card.loaded;
const mapCityParams = ({ card }) => ({ cityId: card.cityId, cityName: card.cityName });
const compareCards = (prev, next) => prev.card.loaded === next.card.loaded;

const mapObservablesToProps = props$ => {

    const subscription = props$.pipe(
        distinctUntilChanged(compareCards),
        filter(filterLoaded),
        map(mapCityParams),
        switchMap(params => from(fetchWeather(params))),
        switchMap(weather => from(processRequestResult(weather))),
        filter(v => v)
    )
        .subscribe(card => dispatch(cardsActions.updateCard(card)));

    const card = props$.pipe(
        map(props => props.card),
        distinctUntilChanged(comparator)
    );

    return {
        observables: { card },
        props: { onRemove },
        unsubscribe() {
            subscription.unsubscribe();
        }
    };
}

const Connected = connect(mapObservablesToProps)(Card);

Connected.displayName = 'WeatherCard';

export default Connected;