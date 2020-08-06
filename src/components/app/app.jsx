import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import FilmPage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from '../video-full-player/video-full-player.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import withTabs from '../../hoc/with-tab/with-tab.jsx';
import {Operations} from "../../reducer/data/data";
import {Operations as UserOperation} from "../../reducer/user/user";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
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
    this._handleSignInClick = this._handleSignInClick.bind(this);
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
          <Route exact path="/dev-auth">
            {this._renderSignIn()}
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
      case `/dev-auth`:
        return this._renderSignIn();
    }
    return null;
  }
  _renderSignIn() {
    const {login} = this.props;
    return (
      <SignIn
        onSubmit={login}
      />
    );
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
        onSignInClick={this._handleSignInClick}
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
  _handleSignInClick() {
    const {isAuthorizing} = this.props;
    this.setState({
      currentPage: `/dev-auth`,
    });
    isAuthorizing()
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
  filmsByGenre: state.DATA.filmsByGenre,
  cardFilms: state.DATA.cardFilms,
  films: state.DATA.films,
  reviews: state.DATA.review
});
const mapDispatchToProps = (dispatch) => ({
  getReviews(film){
    dispatch(Operations.loadReviews(film.id))
  },
  isAuthorizing() {
    dispatch(UserActionCreator.isAuthorizing());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
