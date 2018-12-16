import React from 'react';
import { fromPromise } from 'kefir';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import Component from 'components/modals/SelectCityModal';
import { fetchWeather, processRequestResult } from 'helpers/weather';
import { dispatch, createEventHandler } from 'store';
import * as cards from 'actions/cards';
import * as modal from 'actions/modal';
import isOpen$ from 'store/streams/modal/isOpen';
import getCities from 'helpers/citiesHelper';

const cities = getCities();
// move to new component with memo
const options = cities.map(
    city => (<option value={city.code} key={city.code}>{city.name}</option>)
);

const { handler: onCityChange, stream: cityChange$ } = createEventHandler();
const { handler: onCityAdd, stream: cityAdd$ } = createEventHandler();

const cities$ = cityChange$
    .map(target => target.options)
    .filter(options => options.selectedIndex)
    .map(options => {
        const selectedIndex = options.selectedIndex;
        const cityName = options[selectedIndex].textContent;
        const cityId = options[selectedIndex].value;

        return {
            cityId,
            cityName,  
        };
    });

cityAdd$.flatMapLatest(() => cities$.take(1))
    .flatMapLatest(params => fromPromise(fetchWeather(params)))
    .flatMapLatest(weather => fromPromise(processRequestResult(weather)))
    .filter(v => v)
    .onValue(card => {
        dispatch(cards.actions.addNewCity(card));
        dispatch(modal.actions.hideModal());
    });

const propsMapper = props$ => {
    return isOpen$.map(isOpen => ({
        isOpen,
        options,
        onCityAdd,
        onCityChange: ({target}) => onCityChange(target),
        onClose: () => dispatch(modal.actions.hideModal()),
    }));
}

export default compose(
    setDisplayName('SelectCityModal'),
    mapPropsStream(propsMapper)
)(Component);