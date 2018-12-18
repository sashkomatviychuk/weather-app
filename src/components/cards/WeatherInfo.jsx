import React, { memo } from 'react';
import { getIcon } from 'helpers/weather';
import { getDate } from 'helpers/dates';

export default memo(function WeatherInfo({ onRemove, ...card }) {
    const { cityId, cityName, data } = card;
    const { created } = data
    const dateString = getDate(created);
    const icon = getIcon(data.conditionCode);

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
                    <span className="d-block text-muted">{data.conditionText}</span>
                </div>
                <div className="d-flex weather-conditions flex-wrap ai-center">
                    <div className="d-flex temperature ai-center">
                        <div className={`icon ${icon}`}></div>
                        <div className="temp-text">
                            {data.conditionTemp}<span className="temp-unit">F</span>
                        </div>
                    </div>
                    <div className="weather-description">
                        <dl>
                            <dd><b>Wind speed:</b> {data.windSpeed} mph</dd>
                            <dd><b>Humidity:</b> {data.humidity} %</dd>
                            <dd><b>Surise:</b> {data.sunrise}</dd>
                            <dd><b>Sunset:</b> {data.sunset}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
});