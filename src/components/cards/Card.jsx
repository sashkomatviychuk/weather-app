import React, { memo } from 'react';
import setDisplayName from 'recompose/setDisplayName';
import { getIcon } from 'helpers/weather';
import { getDate } from 'helpers/dates';

function Card({ card, onRemove }) {
    const { cityId, cityName, created, channel } = card;
    const dateString = getDate(created);
    const icon = getIcon(channel.item.condition.code);

    return (
        <div className="card mt-3">
            <div className="card-body">
                <div className="d-flex j-space-between ai-center p-relative">
                    <h5 className="card-title">{cityName}</h5>
                    <button
                        className="remove-btn icon-close"
                        onClick={() => onRemove(cityId)}
                    >
                    </button>
                </div>
                <div>
                    <span className="d-block text-muted">{dateString}</span>
                    <span className="d-block text-muted">{channel.item.condition.text}</span>
                </div>
                <div className="d-flex weather-conditions flex-wrap ai-center">
                    <div className="d-flex temperature ai-center">
                        <div className={`icon ${icon}`}></div>
                        <div className="temp-text">
                            {channel.item.condition.temp}<span className="temp-unit">F</span>
                        </div>
                    </div>
                    <div className="weather-description">
                        <dl>
                            <dd><b>Wind speed:</b> {channel.wind.speed} mph</dd>
                            <dd><b>Humidity:</b> {channel.atmosphere.humidity} %</dd>
                            <dd><b>Surise:</b> {channel.astronomy.sunrise}</dd>
                            <dd><b>Sunset:</b> {channel.astronomy.sunset}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(setDisplayName('Card')(Card));