import React from 'react';
import { map } from 'rxjs/operators/map';

import { weatherList$ } from 'store/selectors/cards';
import Component from 'components/cards/CardsList';
import Card from 'contianers/cards/Card';
import connect from 'store/rx-helpers/connect';

const cardsMapper = card => (<Card
    key={card.cityId}
    card={card}
/>);

// map to component props
const mapper = cards => cards.map(cardsMapper);

const mapObservablesToProps = props$ => {
    const cards = weatherList$.pipe(
        map(weatherList => weatherList.toJS()),
        map(mapper),
    );

    return {
        observables: { cards },
        props: {},
    };
};

const Connected = connect(mapObservablesToProps)(Component);

Connected.displayName = 'CardsList';

export default Connected;