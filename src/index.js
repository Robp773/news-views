import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleDown,faChevronCircleUp, faCalculator, faLink, faCog, faFilter} from '@fortawesome/free-solid-svg-icons'
import 'react-notifications/lib/notifications.css';

library.add(faChevronCircleDown, faChevronCircleUp, faCalculator, faLink, faCog, faFilter)

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,

document.getElementById('root'));
registerServiceWorker();

