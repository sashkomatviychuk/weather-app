import React, { memo } from 'react';
import { getIcon } from 'helpers/weather';
import { getDate } from 'helpers/dates';

export default memo(function WeatherInfo({ onRemove, ...card }) {
    const { cityId, cityName, data, created } = card;
    const dateString = getDate(created);
    const icon = getIcon(data.conditionCode);

    return (
        <div className="card">
            <div className="card__body">
                <div className="card__header">
                    <h5 className="card__title">{cityName}</h5>
                    <button
                        className="button button--remove icon icon--close"
                        onClick={() => onRemove(cityId)}
                    >
                    </button>
                </div>
                <div>
                    <span className="d-block text-muted">{dateString}</span>
                    <span className="d-block text-muted">{data.conditionText}</span>
                </div>
                <div className="card__conditions">
                    <div className="card__temperature-holder">
                        <div className={`icon icon--weather icon--${icon}`}></div>
                        <div className="card__temperature">
                            {data.conditionTemp}<span className="card__temperature-unit">F</span>
                        </div>
                    </div>
                    <div className="card__condition-container">
                        <dl className="card__condition">
                            <dd className="card__condition-item"><b>Wind speed:</b> {data.windSpeed} mph</dd>
                            <dd className="card__condition-item"><b>Humidity:</b> {data.humidity} %</dd>
                            <dd className="card__condition-item"><b>Surise:</b> {data.sunrise}</dd>
                            <dd className="card__condition-item"><b>Sunset:</b> {data.sunset}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
});