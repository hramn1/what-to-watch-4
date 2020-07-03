import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from './mocks/films.js';
const Settings = {
  NAME_FILM: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`],
  GENRE: `Drama`,
  YEAR: `2014`,
};
const onTitleClick = () => {};

ReactDOM.render(
    <App
      nameFilm = {Settings.NAME_FILM}
      genreFilm = {Settings.GENRE}
      yearFilm = {Settings.YEAR}
      films = {films}
      onTitleClick = {onTitleClick}
    />,
    document.querySelector(`#root`)
);
