import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operations} from "./reducer/data/data.js";
import reducer from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import {createAPI} from './api.js';

const api = createAPI();
const store = createStore(
    reducer,
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
