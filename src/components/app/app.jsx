import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import Main from "../main/main.jsx";
import FilmPage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from '../video-full-player/video-full-player.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import withTabs from '../../hoc/with-tab/with-tab.jsx';
import PageAddOverview from "../add-review/add-review.jsx";
import {Operations} from "../../reducer/data/data";
import {Operations as ReviewOperation} from "../../reducer/data/data";
import {Operations as FavoriteOperation} from "../../reducer/data/data";
import {Operations as UserOperation} from "../../reducer/user/user";
import {AuthorizationStatus} from "../../reducer/user/user";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
import history from "../../history.js";
import {Pages} from  "../../const.js"
const FilmPageWrapper = withTabs(FilmPage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

// const onTitleClick = () => {};
const COUNT_FILMS = 4;
class App extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   // currentPage: `/`,
    //   // selectedFilm: null,
    //   //isVideoPlayer: false,
    // };
    this._handleFilmCardClick = this._handleFilmCardClick.bind(this);
    // this._renderMoviePlayer = this._renderMoviePlayer.bind(this);
    // this._handlePlayClick = this._handlePlayClick.bind(this);
    // this._handleClosePlayerClick = this._handleClosePlayerClick.bind(this);
    // this._handleSignInClick = this._handleSignInClick.bind(this);
    // this._handleAddReview = this._handleAddReview.bind(this);
    this._handlePostReview = this._handlePostReview.bind(this);
    this._handleFilmFavorite = this._handleFilmFavorite.bind(this);
  }
  render() {
    const {films, reviews, filmsByGenre}=this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={Pages.MAIN}
            render={() => {
              const {filmsByGenre, cardFilms} = this.props;
              return (
                <Main
                films={filmsByGenre}
                cardFilms={cardFilms}
                onFilmCardClick={this._handleFilmCardClick}
                handleFilmFavorite={this._handleFilmFavorite}
                />
              )
            }}/>
            <Route exact path={`${Pages.FILM}/:id?`}
              render={({match}) => {
              const id = Number(match.params.id);
              const cardFilms = films[id-1];
              const likeFilms = filmsByGenre.filter((film) => film.genre === cardFilms.genre && film.title !== cardFilms.title).slice(0, COUNT_FILMS)
              return <FilmPageWrapper
                id={id}
                films={films}
                cardFilms={cardFilms}
                filmsByGenre={filmsByGenre}
                likeFilms={likeFilms}
                reviews={reviews}
                // onPlayClick={this._handlePlayClick}
                onFilmCardClick={this._handleFilmCardClick}
                // onAddReview={this._handleAddReview}
              />
            }}
            />
            <Route exact path={`${Pages.PLAYER}/:id?`}
                   render={({match}) => {
                     const id = Number(match.params.id);
                     const cardFilms = films[id - 1];
                     return <VideoPlayerFullWrapped
                       film={cardFilms}
                     />
                   }}
              />
            <Route exact path={Pages.LOGIN}>
              {this._renderSignIn()}
            </Route>
            <Route exact path={`${Pages.FILM}/:id?/review`}
                   render={({match}) => {
                   const id = Number(match.params.id);
            const cardFilms = films[id - 1];
            return               <PageAddOverview
            film={cardFilms}
            postReview={this._handlePostReview}
          />
            }}
            />
            </Switch>
      </Router>
    );
  }
  // _renderApp() {
  //   const {currentPage} = this.state;
  //   const {isVideoPlayer} = this.state;
  //
  //   if (isVideoPlayer) {
  //     return this._renderMoviePlayer();
  //   }
  //   // switch (currentPage) {
  //   //   case `/`:
  //   //     return this._renderMain();
  //   //   case `/movie-page`:
  //   //     return this._renderFilm();
  //   //   case `/dev-auth`:
  //   //     return this._renderSignIn();
  //   //   case `/dev-review`:
  //   //     return this._renderAddReview();
  //   // }
  //   return null;
  // }
  _handleFilmFavorite(film){
    const {putFavoriteFilm} = this.props;
    putFavoriteFilm(film)
  }
  _renderSignIn() {
    const {login, authorizationStatus} = this.props;
    return (
      authorizationStatus !== AuthorizationStatus.AUTH ?
      <SignIn
        onSubmit={login}
      /> :
        <Redirect
          to={Pages.MAIN}
          />
    );
  }
  // _renderAddReview() {
  //   const {selectedFilm} = this.state;
  //   return (
  //     <PageAddOverview
  //       film={selectedFilm}
  //       postReview={this._handlePostReview}
  //     />
  //   );
  // }
  // _renderMain() {
  //   const {filmsByGenre, cardFilms} = this.props;
  //   return (
  //     <Main
  //       films={filmsByGenre}
  //       cardFilms={cardFilms}
  //       // onPlayClick={this._handlePlayClick}
  //       onTitleClick={onTitleClick}
  //       onFilmCardClick={this._handleFilmCardClick}
  //     />
  //   );
  // }
  // _handlePlayClick(film) {
  //   const onFilmSelect = () => {
  //     this.setState({
  //       selectedFilm: film,
  //     });
  //   };
  //   onFilmSelect(film);
  //
  //   this.setState({
  //     isVideoPlayer: true,
  //   });
  // }
  _handlePostReview(film, reviewData) {
    const {postReviews} = this.props;
    postReviews(reviewData, film);
  }
  // _renderFilm() {
  //   // const {selectedFilm} = this.state;
  //   const {filmsByGenre, reviews} = this.props;
  //   // const likeFilms = filmsByGenre.filter((film) => film.genre === selectedFilm.genre && film.title !== selectedFilm.title)
  //   //   .slice(0, COUNT_FILMS);
  //   return (
  //     <FilmPageWrapper
  //       cardFilms={selectedFilm}
  //       filmsByGenre={filmsByGenre}
  //       likeFilms={likeFilms}
  //       reviews={reviews}
  //       onPlayClick={this._handlePlayClick}
  //       onFilmCardClick={this._handleFilmCardClick}
  //       onAddReview={this._handleAddReview}
  //       onSignInClick={this._handleSignInClick}
  //     />
  //   );
  // }
  // _renderMoviePlayer() {
  //   const {cardFilms} = this.props;
  //   // let {selectedFilm} = this.state;
  //   // if (!selectedFilm) {
  //   //   selectedFilm = cardFilms;
  //   // }
  //   return (
  //     <VideoPlayerFullWrapped
  //       film={cardFilms}
  //       onClosePlayerClick={this._handleClosePlayerClick}
  //     />
  //   );
  // }
  // _handleClosePlayerClick() {
  //   this.setState({
  //     isVideoPlayer: false,
  //   });
  // }
  // _handleSignInClick() {
  //   const {isAuthorizing} = this.props;
  //   this.setState({
  //     currentPage: `/dev-auth`,
  //   });
  //   isAuthorizing();
  // }
  // _handleAddReview() {
  //   this.setState({
  //     currentPage: `/dev-review`,
  //   });
  // }

  _handleFilmCardClick(film) {
    const {getReviews} = this.props;
    history.push(`${Pages.FILM}/${film.id}`);
    // this.setState({
    //   currentPage: `/movie-page`,
    //   selectedFilm: film,
    // });
    getReviews(film);
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
  getReviews: propTypes.func.isRequired,
  isAuthorizing: propTypes.func.isRequired,
  putFavoriteFilm: propTypes.func.isRequired,
  reviews: propTypes.array.isRequired,
  postReviews: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  filmsByGenre: state.DATA.filmsByGenre,
  cardFilms: state.DATA.cardFilms,
  films: state.DATA.films,
  reviews: state.DATA.review,
  authorizationStatus: state.USER.authorizationStatus,
});
const mapDispatchToProps = (dispatch) => ({
  getReviews(film) {
    dispatch(Operations.loadReviews(film.id));
  },
  isAuthorizing() {
    dispatch(UserActionCreator.isAuthorizing());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  postReviews(reviewData, film) {
    dispatch(ReviewOperation.postReview(film.id, reviewData));
  },
  putFavoriteFilm(film){
    dispatch(FavoriteOperation.putFavorite(film, film.isFavorite));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
