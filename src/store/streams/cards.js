import { state$, store, getIn } from 'store';

const getWeatherList = getIn(['cards', 'weatherList'], []);

export const weatherList$ = state$
    .map(state => getWeatherList(state))
    .toProperty(() => getWeatherList(store.getState()));
