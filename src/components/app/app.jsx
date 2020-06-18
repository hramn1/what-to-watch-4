import React from "react";
import Main from "../main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {nameFilm, genreFilm, yearFilm} = props;
  return (
    <Main nameFilm={nameFilm} genreFilm={genreFilm} yearFilm={yearFilm} />
  );
};


export default App;
