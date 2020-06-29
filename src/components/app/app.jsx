import React from "react";
import propTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {nameFilm, genreFilm, yearFilm, onTitleClick} = props;
  return (
    <Main nameFilm={nameFilm} genreFilm={genreFilm} yearFilm={yearFilm} onTitleClick={onTitleClick} />
  );
};

App.propTypes = {
  genreFilm: propTypes.string.isRequired,
  yearFilm: propTypes.string.isRequired,
  nameFilm: propTypes.arrayOf(propTypes.string).isRequired,
  onTitleClick: propTypes.func.isRequired
};

export default App;
