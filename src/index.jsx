import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
LogRocket.init('<YOUR-ORG-ID>/hattrick');

import { store } from './_helpers';
import MainCss from './_css/Main.scss';
import { App } from './App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
