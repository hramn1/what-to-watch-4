import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import FilmPage from "../movie-page/movie-page.jsx";

const onTitleClick = () => {};
const COUNT_FILMS = 4;
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: `/`,
      selectedFilm: null,
    };
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
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
            <FilmPage
              cardFilms={cardFilms}
              likeFilms={this.props.films}
              onFilmCardClick={this._handleFilmCardClick}
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
        return this._renderFilm();
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
        onFilmCardClick={this._handleFilmCardClick}
      />
    );
  }
  _renderFilm() {
    const {selectedFilm} = this.state;
    const {films} = this.props;

    const likeFilms = films.filter((film) => film.genre === selectedFilm.genre && film.title !== selectedFilm.title)
      .slice(0, COUNT_FILMS);

    return (
      <FilmPage
        cardFilms={selectedFilm}
        films={films}
        likeFilms={likeFilms}
        onFilmCardClick={this._handleFilmCardClick}
      />
    );
  }
  _handleFilmCardClick(film) {
    this.setState({
      currentPage: `/movie-page`,
      selectedFilm: film,
    });
  }
}
export default App;
App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.object.isRequired,
};

