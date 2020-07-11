import React from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx"

const onTitleClick = () => {};

const App = (props) => {
  const {films, cardFilms} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            films={films}
            cardFilms={cardFilms}
            onTitleClick = {onTitleClick}
          />
        </Route>
        <Route exact path="/movie-page">
          <MoviePage
            cardFilms={cardFilms}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.object.isRequired
};

export default App;
