import React, { memo } from 'react';
import setDisplayName from 'recompose/setDisplayName';

import Loader from 'components/cards/Loader';
import WeatherInfo from 'components/cards/WeatherInfo';

function Card({ onRemove, ...card }) {
    const { cityId, cityName, loaded } = card;
    
    if (!loaded) {
        return (<Loader
            cityId={cityId}
            cityName={cityName}
            onRemove={onRemove}
        />);
    }

    return (
        <WeatherInfo
            onRemove={onRemove}
            {...card}
        />
    )
}

export default memo(setDisplayName('Card')(Card));