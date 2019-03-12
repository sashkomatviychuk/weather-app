import React from 'react';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { mapTo } from 'rxjs/operators/mapTo';

import Component from 'components/modals/SelectCityModal';
import * as cards from 'actions/cards';
import * as modal from 'actions/modal';
import { dispatch } from 'store';
import { createEventHandler } from 'store/rx-helpers/index';
import { isOpen$ } from 'store/selectors/modal';
import getCities from 'helpers/citiesHelper';
import connect from 'store/rx-helpers/connect';

const cities = getCities();
// move to new component with memo
const options = cities.map(
    city => (<option value={city.code} key={city.code}>{city.name}</option>)
);

const { handler: onCityChange, stream: cityChange$ } = createEventHandler();
const { handler: onCityAdd, stream: cityAdd$ } = createEventHandler();

const cities$ = cityChange$.pipe(
    map(target => target.options),
    filter(options => options.selectedIndex),
    map(options => {
        const selectedIndex = options.selectedIndex;
        const cityName = options[selectedIndex].textContent;
        const cityId = options[selectedIndex].value;

        return {
            cityId,
            cityName,  
        };
    })
);

const subscription = cities$.pipe(
    switchMap(data => cityAdd$.pipe(mapTo(data))),
    map(cityData => ({
        ...cityData,
        loaded: false,
        data: null,
    }))
).subscribe(card => {
    dispatch(cards.actions.addCard(card));
    dispatch(modal.actions.hideModal());
});

const mapObservablesToProps = props$ => {
    return {
        observables: { isOpen: isOpen$ },
        props: {
            options,
            onCityAdd,
            onCityChange: ({target}) => onCityChange(target),
            onClose: () => dispatch(modal.actions.hideModal()),
        },
        unsubscribe() {
            subscription.unsubscribe();
        }
    }
}

const Connected = connect(mapObservablesToProps)(Component);

Connected.displayName = 'SelectCityModal';

export default Connected;
