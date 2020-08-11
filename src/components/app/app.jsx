import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {Redirect, Router, Link, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import VideoPlayerFull from '../video-full-player/video-full-player.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import withTabs from '../../hoc/with-tab/with-tab.jsx';
import AddReview from "../add-review/add-review.jsx";
import {Operations as ReviewOperation} from "../../reducer/data/data";
import {Operations as FavoriteOperation} from "../../reducer/data/data";
import {Operations as UserOperation} from "../../reducer/user/user";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
import {ActionCreator} from "../../reducer/app/app";
import history from "../../history.js";
import {Pages} from "../../const.js";
import PrivateRoute from "../private-route/private-route.jsx";
import MyList from "../my-list/my-list.jsx";
import withReview from "../../hoc/with-review/with-review.jsx";

const FilmPageWrapper = withTabs(FilmPage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);
const AddReviewWrapped = withReview(AddReview);

const COUNT_FILMS = 4;
class App extends PureComponent {
  constructor(props) {
    super(props);
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    this._handlePostReview = this._handlePostReview.bind(this);
    this._handleFilmFavorite = this._handleFilmFavorite.bind(this);
  }
  render() {
    const {films, isLoadingFilm, isError, resetBtn, cardFilms, login, authorizationStatus, filmsByGenre} = this.props;
    if (!isLoadingFilm) {
      resetBtn();
    }
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={Pages.MAIN}
            render={() => {
              return (
                <Main
                  films={filmsByGenre}
                  cardFilms={cardFilms}
                  onFilmCardClick={this._handleFilmCardClick}
                  handleFilmFavorite={this._handleFilmFavorite}
                />
              );
            }}/>
          <Route exact path={`${Pages.FILM}/:id?`}
            render={({match}) => {
              const id = Number(match.params.id);
              const cardFilm = films[id - 1];
              const likeFilms = filmsByGenre.filter((film) => film.genre === cardFilm.genre && film.title !== cardFilm.title).slice(0, COUNT_FILMS);
              return (
                !isLoadingFilm ?
                  <FilmPageWrapper
                    id={id}
                    films={films}
                    cardFilms={cardFilm}
                    filmsByGenre={filmsByGenre}
                    likeFilms={likeFilms}
                    handleFilmFavorite={this._handleFilmFavorite}
                    onFilmCardClick={this._handleFilmCardClick}
                  /> : null
              );
            }}/>
          <Route exact path={`${Pages.PLAYER}/:id?`}
            render={({match}) => {
              const id = Number(match.params.id);
              const cardFilm = films[id - 1];
              return (
                !isLoadingFilm ?
                  <VideoPlayerFullWrapped
                    film={cardFilm}
                  /> : null
              );
            }}/>
          <Route exact path={Pages.LOGIN}
            render={()=> {
              return (
                authorizationStatus !== AuthorizationStatus.AUTH ?
                  <SignIn
                    onSubmit={login} /> :
                  <Redirect
                    to={Pages.MAIN}
                  />
              );
            }}/>
          <Route exact path={`${Pages.FILM}/:id?/review`}
            render={({match}) => {
              const id = Number(match.params.id);
              const cardFilm = films[id - 1];
              return (
                !isLoadingFilm ?
                  <AddReviewWrapped
                    film={cardFilm}
                    isError={isError}
                    postReview={this._handlePostReview}
                  /> : null
              );
            }}/>
          <PrivateRoute exact
            path={Pages.MY_LIST}
            render={() => {
              return (
                !isLoadingFilm ?
                  <MyList
                    onFilmCardClick={this._handleFilmCardClick}
                  /> : null
              );
            }}/>
          <Route
            render={() => (
              <React.Fragment>
                <h1>
                  404.
                  <br />
                  <small>Page not found</small>
                </h1>
                <Link to="/">Go to main page</Link>
              </React.Fragment>
            )}
          />
        </Switch>
      </Router>
    );
  }
  _handleFilmFavorite(film) {
    const {putFavoriteFilm} = this.props;
    putFavoriteFilm(film);
  }
  _handlePostReview(film, reviewData) {
    const {postReviews} = this.props;
    postReviews(reviewData, film);
  }
  _handleFilmCardClick(film) {
    history.push(`${Pages.FILM}/${film.id}`);
  }
}
App.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  cardFilms: propTypes.oneOfType([
    propTypes.array.isRequired,
    propTypes.object.isRequired,
  ]),
  filmsByGenre: propTypes.arrayOf(propTypes.object).isRequired,
  login: propTypes.func.isRequired,
  isAuthorizing: propTypes.func.isRequired,
  putFavoriteFilm: propTypes.func.isRequired,
  postReviews: propTypes.func.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  isLoadingFilm: propTypes.bool.isRequired,
  resetBtn: propTypes.func.isRequired,
  isError: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.string.isRequired,
  ]),
};
const mapStateToProps = (state) => ({
  progressAuth: state.USER.authorizationInProgress,
  filmsByGenre: state.DATA.filmsByGenre,
  cardFilms: state.DATA.cardFilms,
  films: state.DATA.films,
  authorizationStatus: state.USER.authorizationStatus,
  isLoadingFilm: state.DATA.loadingFilms,
});
const mapDispatchToProps = (dispatch) => ({
  isAuthorizing() {
    dispatch(UserActionCreator.isAuthorizing());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  postReviews(film, reviewData) {
    dispatch(ReviewOperation.postReview(film.id, reviewData));
  },
  putFavoriteFilm(film) {
    dispatch(FavoriteOperation.putFavorite(film, film.isFavorite));
  },
  resetBtn() {
    dispatch(ActionCreator.resetShowMoreBtn());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
