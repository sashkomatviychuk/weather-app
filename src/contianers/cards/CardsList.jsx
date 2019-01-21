import React from 'react';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import { comparator } from 'helpers/weather';
import { actions as cardsActions } from 'actions/cards';
import { dispatch, createEventHandler } from 'store';
import { weatherList$ } from 'store/streams/cards';
import Component from 'components/cards/CardsList';
import Card from 'contianers/cards/Card';

const { handler: onRemove, stream: removes$ } = createEventHandler();

removes$
    .skipDuplicates()
    .onValue(cityId => {
        if (window.confirm('Remove this city from list?')) {
            dispatch(cardsActions.removeCard(cityId));
        }
    });

const cardsMapper = card => (<Card
    key={card.cityId}
    onRemove={onRemove}
    {...card}
/>);

const cardsComparator = (prev, next) => {
    const prevLength = prev.length || 0;
    const nextLength = next.length || 0;

    if (prevLength !== nextLength) {
        return false;
    }

    for (let i = 0; i < nextLength; i++) {
        if (!comparator(prev[i], next[i])) {
            return false;
        }
    }

    return true;
}

const mapper = cards => ({
    cards: cards.map(cardsMapper),
});

const propsMapper = props$ => {
    return weatherList$
        .skipDuplicates(cardsComparator)
        .map(mapper);
};

export default compose(
    setDisplayName('CardsList'),
    mapPropsStream(propsMapper)
)(Component);