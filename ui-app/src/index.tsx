/**
 * @owner BlueSky
 * @description Root app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './modules/app/components/app.component';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducer from './store/reducers';
import AppSaga from './store/sagas';

import ICreateMuiTheme from './shared/theme/create-mui-theme';
const sagaMiddleware = createSagaMiddleware();
const appStore = createStore(
    AppReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(AppSaga);

ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <ICreateMuiTheme >
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </ICreateMuiTheme>

        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
