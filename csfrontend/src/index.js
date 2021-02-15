import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./data/store";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from 'redux-persist/integration/react'
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.scss';


let persistor = persistStore(store)
ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById("root")
);