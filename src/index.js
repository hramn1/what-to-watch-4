import React from "react";
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from "./reducer/reducer.js";
import App from "./components/app/app.jsx";

import cardFilms from "./mocks/card-film.js";
import films from './mocks/films.js';
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);
ReactDOM.render(
  <Provider store={store}>
  <App
      films = {films}
      cardFilms = {cardFilms}
    />
  </Provider>,
  document.querySelector(`#root`)
);
