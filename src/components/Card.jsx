import React from 'react';
import connect from 'react-redux/lib/connect/connect';

import { removeCity } from './../actions/cards';
import { getIcon } from '../helpers/weather';
import { getDate } from './../helpers/dates';

class Card extends React.Component {

    removeCityHandler = () => {
        if (window.confirm('Remove this city from list?')) {
            this.props.removeCityFromList(this.props.cityId);
        }
    }

    render() {
        const { cityId, cityName, created, channel } = this.props;
        const dateString = getDate(created);
        const icon = getIcon(channel.item.condition.code);

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{cityName}</h5>
                        <button
                            className="align-self-start remove-btn icon-close"
                            onClick={this.removeCityHandler}
                        >
                        </button>
                    </div>
                    <div>
                        <span className="d-block text-muted">{dateString}</span>
                        <span className="d-block text-muted">{channel.item.condition.text}</span>
                    </div>
                    <div className="d-flex weather-conditions flex-wrap">
                        <div className="d-flex temperature">
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
}

const mapDispatchToProps = dispatch => {
    return {
        removeCityFromList(cityId) {
            dispatch(removeCity(cityId))
        },
    };
}

export default connect(undefined, mapDispatchToProps)(Card);