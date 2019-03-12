import React, { memo } from 'react';

import Loader from 'components/cards/Loader';
import WeatherInfo from 'components/cards/WeatherInfo';

function Card({ onRemove, card }) {
    const { cityId, cityName, loaded } = card;
    
    if (!loaded) {
        return (<Loader
            cityId={cityId}
            cityName={cityName}
            onRemove={() => onRemove(cityId)}
        />);
    }

    return (
        <WeatherInfo
            onRemove={onRemove}
            {...card}
        />
    )
}

const MemoCard = memo(Card);

MemoCard.displayName = 'Card';

export default MemoCard;