import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const onTitleClick = () => {};
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: `/`,
      selectedMovie: null,
    };
    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }
  render() {
    const {cardFilms} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' >
            {this._renderApp()}
          </Route>
          <Route exact path='/movie-page'>
            <MoviePage
              cardFilms={cardFilms}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  _renderApp() {
    const {currentPage} = this.state;
    switch (currentPage) {
      case `/`:
        return this._renderMain();
      case `/movie-page`:
        return this._renderMovie();
    }
    return null;
  }
  _renderMain() {
    const {films, cardFilms} = this.props;
    return (
      <Main
        films={films}
        cardFilms={cardFilms}
        onTitleClick={onTitleClick}
        onMovieCardClick={this._handleMovieCardClick }
      />
    );
  }
  _renderMovie() {
    const {selectedMovie} = this.state;
    const {films} = this.props;
    return (
      <MoviePage
        cardFilms={selectedMovie}
        films={films}
        onMovieCardClick={this._handleMovieCardClick }
      />
    );
  }
  _handleMovieCardClick(film) {
    this.setState({
      currentPage: `/movie-page`,
      selectedMovie: film,
    });
  }
}
export default App;
App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.object.isRequired
};

