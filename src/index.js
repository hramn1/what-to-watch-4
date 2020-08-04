import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operations, reducer} from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import {createAPI} from './api.js';
import {ALL_GENRES, SHOW_FILMS} from "./const";
import {availableGenre} from "./utils";

const api = createAPI();
const initialState = {
  films: [],
  cardFilms: [],
  currentGenre: ALL_GENRES,
  availableGenres: [ALL_GENRES],
  filmsByGenre: [],
  showFilms: SHOW_FILMS,
};

const store = createStore(
    reducer,initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);
store.dispatch(Operations.loadFilms());
store.dispatch(Operations.loadPromo());
ReactDOM.render(
    <Provider store={store}>
      <App
      />
    </Provider>,
    document.querySelector(`#root`)
);
