import { fetchWeather, processRequestResult } from './../helpers/config';
import { hideModal } from './modal';

export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const UPDATE_ALL_CARDS = 'UPDATE_ALL_CARDS';

export const addNewCity = card => {
    return {
        type: ADD_CARD,
        card,
    }
}

export const removeCity = cityId => {
    return {
        type: REMOVE_CARD,
        cityId,
    };
}

export const updateAllCards = cards => {
    return {
        type: UPDATE_ALL_CARDS,
        cards,
    };
}

export const fetchCityWeather = params => (dispatch, getState) => {
    return fetchWeather(params)
        .then(processRequestResult)
        .then(card => {
            dispatch(addNewCity(card));
            dispatch(hideModal());
        });
};

export const reloadAllCards = () => (dispatch, getState) => {
    const state = getState();
    const promises = state.cards.weatherList.map(fetchWeather);

    console.log('promises', promises);

    Promise.all(promises)
        .then(weatherList => {
            console.log('weatherList', weatherList);
            const cards = weatherList.map(processRequestResult);
            
            dispatch(updateAllCards(cards));
        })
        .catch(err => {});
};