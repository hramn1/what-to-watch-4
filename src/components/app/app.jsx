import React from "react";
import propTypes from "prop-types";
import Main from "../main/main.jsx";

const onTitleClick = () => {};

const App = (props) => {
  const {films, cardFilms} = props;
  return (
    <Main
      films={films}
      cardFilms={cardFilms}
      onTitleClick = {onTitleClick}
    />
  );
};

App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.object.isRequired
};

export default App;
