import { state$, store, getIn } from 'store';

const getWeatherList = getIn(['cards', 'weatherList'], []);

export default state$
    .map(state => getWeatherList(state).toJS())
    .skipDuplicates()
    .toProperty(() => getWeatherList(store.getState()).toJS());