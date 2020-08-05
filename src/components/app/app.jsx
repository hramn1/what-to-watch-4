import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import FilmPage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from '../video-full-player/video-full-player.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';
import {connect} from "react-redux";
import withTabs from '../../hoc/with-tab/with-tab.jsx';
import {ActionCreator} from "../../reducer/app/app";
import {Operations} from "../../reducer/data/data";
const FilmPageWrapper = withTabs(FilmPage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

const onTitleClick = () => {};
const COUNT_FILMS = 4;
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: `/`,
      selectedFilm: null,
      isVideoPlayer: false,
    };
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._renderMoviePlayer = this._renderMoviePlayer.bind(this);
    this._handlePlayClick = this._handlePlayClick.bind(this);
    this._handleClosePlayerClick = this._handleClosePlayerClick.bind(this);
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
            <FilmPageWrapper
              cardFilms={cardFilms}
              likeFilms={this.props.filmsByGenre}
              onFilmCardClick={this._handleFilmCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  _renderApp() {
    const {currentPage} = this.state;
    const {isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._renderMoviePlayer();
    }
    switch (currentPage) {
      case `/`:
        return this._renderMain();
      case `/movie-page`:
        return this._renderFilm();
    }
    return null;
  }
  _renderMain() {
    const {filmsByGenre, cardFilms} = this.props;
    return (
      <Main
        films={filmsByGenre}
        cardFilms={cardFilms}
        onPlayClick={this._handlePlayClick}
        onTitleClick={onTitleClick}
        onFilmCardClick={this._handleFilmCardClick}
      />
    );
  }
  _handlePlayClick(film) {
    const onFilmSelect = () => {
      this.setState({
        selectedFilm: film,
      });
    };
    onFilmSelect(film);

    this.setState({
      isVideoPlayer: true,
    });
  }
  _renderFilm() {
    const {selectedFilm} = this.state;
    const {filmsByGenre, reviews} = this.props;
    const likeFilms = filmsByGenre.filter((film) => film.genre === selectedFilm.genre && film.title !== selectedFilm.title)
      .slice(0, COUNT_FILMS);
    return (
      <FilmPageWrapper
        cardFilms={selectedFilm}
        filmsByGenre={filmsByGenre}
        likeFilms={likeFilms}
        reviews={reviews}
        onPlayClick={this._handlePlayClick}
        onFilmCardClick={this._handleFilmCardClick}
      />
    );
  }
  _renderMoviePlayer() {
    const {cardFilms} = this.props;
    let {selectedFilm} = this.state;
    if (!selectedFilm) {
      selectedFilm = cardFilms;
    }
    return (
      <VideoPlayerFullWrapped
        film={selectedFilm}
        onClosePlayerClick={this._handleClosePlayerClick}
      />
    );
  }
  _handleClosePlayerClick() {
    this.setState({
      isVideoPlayer: false,
    });
  }

  _handleFilmCardClick(film) {
    const {getReviews} = this.props;
    this.setState({
      currentPage: `/movie-page`,
      selectedFilm: film,
    });
    getReviews(film)
  }
}
App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.oneOfType([
    propTypes.array.isRequired,
    propTypes.object.isRequired,
  ]),
  filmsByGenre: propTypes.arrayOf(propTypes.object).isRequired
};
const mapStateToProps = (state) => ({
  f:console.log(state),
  filmsByGenre: state.DATA.filmsByGenre,
  cardFilms: state.DATA.cardFilms,
  films: state.DATA.films,
  reviews: state.DATA.review
});
const mapDispatchToProps = (dispatch) => ({
  getReviews(film){
    dispatch(Operations.loadReviews(film.id))
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
