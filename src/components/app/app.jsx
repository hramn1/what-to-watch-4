import React from "react";
import propTypes from "prop-types";

import Main from "../main.jsx";

const App = (props) => {
  const {nameFilm, genreFilm, yearFilm} = props;
  return (
    <Main nameFilm={nameFilm} genreFilm={genreFilm} yearFilm={yearFilm} />
  );
};

App.propTypes = {
  genreFilm: propTypes.object.isRequired,
  yearFilm: propTypes.object.isRequired,
  nameFilm: propTypes.arrayOf(propTypes.string).isRequired
};

export default App;
