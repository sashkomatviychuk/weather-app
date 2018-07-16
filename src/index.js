import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';

import App from './App';
import configureStore from './configureStore'
import registerServiceWorker from './registerServiceWorker';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('root')
    );
}

render(App);

registerServiceWorker();
