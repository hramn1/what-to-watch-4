import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Operations} from "./reducer/data/data.js";
import {Operations as UserOperations, AuthorizationStatus} from "./reducer/user/user.js";
import reducer from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import {ActionCreator} from "./reducer/user/user.js";
import {createAPI} from './api.js';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);
store.dispatch(Operations.loadFilms());
store.dispatch(Operations.loadPromo());
store.dispatch(UserOperations.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
      />
    </Provider>,
    document.querySelector(`#root`)
);
