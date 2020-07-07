import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

import cardFilms from "./mocks/card-film.js";
import films from './mocks/films.js';

ReactDOM.render(
    <App
      films = {films}
      cardFilms = {cardFilms}
    />,
    document.querySelector(`#root`)
);
