import axios from 'axios';

const WEATHER_URL = 'https://query.yahooapis.com/v1/public/yql';

const getStatement = key => `select * from weather.forecast where woeid=${key}`;

/**
 * Returns url for fetching weather for city with id=key
 * @param {String} key 
 */
export const buildUrl = key => {
    const statement = getStatement(key);

    return `${WEATHER_URL}?format=json&q=${statement}`;
}

/**
 * Fetch weather for city
 * @param {Object} params
 * @param {String} params.cityId
 * @param {String} params.cityName
 *  
 */
export const fetchWeather = params => {
    return axios.get(buildUrl(params.cityId))
        .then(response => ({
            url: response.config.url,
            data: response.status === 200 ? response.data : null,
            cityId: params.cityId,
            cityName: params.cityName,
            loaded: true,
        }))
        .catch(err => ({
            url: err.config.url,
            data: null,
            cityId: params.cityId,
            cityName: params.cityName,
            loaded: true,
        }));
}

/**
 * If no request data, than return data from cache
 * @param {object} weather
 * @param {String} weather.cityId
 * @param {String} weather.cityName
 * @param {String} weather.url
 * @param {object} weather.data
 */
export const processRequestResult = async (weather) => {
    if (weather.data) {
        const query = weather.data.query;
        const created = query.created;
        const channel = query.results.channel;
        
        return {
            ...weather,
            data: { created, channel },
        };
    } else {
        // get card from cache
        const url = weather.url;

        return caches.match(url).then(function (response) {
            if (response) {
                return response.json().then(function updateFromCache(json) {
                    const channel = json.query.results.channel;
                    const created = json.query.created;

                    return {
                        ...weather,
                        data: { created, channel },
                    };
                });
            }
        });
    }
}

export const getIcon = weatherCode => {
    // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
    weatherCode = parseInt(weatherCode);

    switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
            return 'sunny-day';
        case 0: // tornado
        case 1: // tropical storm
        case 2: // hurricane
        case 6: // mixed rain and sleet
        case 8: // freezing drizzle
        case 9: // drizzle
        case 10: // freezing rain
        case 11: // showers
        case 12: // showers
        case 17: // hail
        case 35: // mixed rain and hail
        case 40: // scattered showers
            return 'rain';
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
            return 'thunderstorms';
        case 5: // mixed rain and snow
        case 7: // mixed snow and sleet
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 18: // sleet
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
            return 'snow';
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
            return 'fog';
        case 24: // windy
        case 23: // blustery
            return 'windy';
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
            return 'cloudy';
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
            return 'partly-cloudy-day';
    }
}