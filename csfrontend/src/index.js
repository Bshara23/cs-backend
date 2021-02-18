import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './data/store';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {CookiesProvider} from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

let persistor = persistStore (store);
ReactDOM.render (
  // <GoogleReCaptchaProvider
  //   reCaptchaKey={SITE_KEY}

  // >
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

  </CookiesProvider>,
  // </GoogleReCaptchaProvider>,
  document.getElementById ('root')
);
