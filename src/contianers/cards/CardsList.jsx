import React from 'react';
import mapPropsStream from 'recompose/mapPropsStream';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import { actions as cardsActions } from 'actions/cards';
import { dispatch, createEventHandler } from 'store';
import cardsList$ from 'store/streams/cards/list';
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

const propsMapper = props$ => {
    return cardsList$.map(cards => ({
        cards: cards.map(cardsMapper),
    }));
};

export default compose(
    setDisplayName('CardsList'),
    mapPropsStream(propsMapper)
)(Component);