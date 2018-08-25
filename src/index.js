import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './shared/redux/store'

async function init() {
    console.log('Waiting for store')

    await configureStore();

    console.log('Store was fully loaded')

    ReactDOM.render(<App />, document.getElementById('root'));

    console.log('Rendering');

    registerServiceWorker();
}

init();