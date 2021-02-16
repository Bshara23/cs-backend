import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './data/store';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {SITE_KEY} from './data/Consts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

let persistor = persistStore (store);
ReactDOM.render (
  // <GoogleReCaptchaProvider
  //   reCaptchaKey={SITE_KEY}

   
  // >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </GoogleReCaptchaProvider>,
  ,
  document.getElementById ('root')
);
