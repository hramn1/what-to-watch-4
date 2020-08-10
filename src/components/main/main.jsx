import React from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app.js';
import {AuthorizationStatus} from "../../reducer/user/user";
import FilmList from "../film-list/film-list.jsx";
import FilmGenre from "../film-genre/film-genre.jsx";
import BtnLoad from "../btn-load/btn-load.jsx";
import {Link} from "react-router-dom";
import {Pages} from "../../const.js";


const Main = (props) => {
  const {
    films,
    cardFilms,
    authorizationStatus,
    authorizationInfo,
    filmsByGenre,
    availableGenres,
    currentGenre,
    onShowMoreClick,
    onGenreClick,
    showFilms,
    handleFilmFavorite,
    onFilmCardClick,
    error,
  } = props;
  let showedFilms = [];
  let filmOnPage = [];
  if (filmsByGenre.length === 0) {
    filmOnPage = films;
    showedFilms = films.slice(0, showFilms);
  } else {
    showedFilms = filmsByGenre.slice(0, showFilms);
    filmOnPage = filmsByGenre;
  }
  if(error){
    return (
    <React.Fragment>
      <h1>SERVER ERROR</h1>
    </React.Fragment>
    )
  }
  const isInMyLyst = cardFilms.isFavorite ?
    <React.Fragment>
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    </React.Fragment> :
    <React.Fragment>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    </React.Fragment>;
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={cardFilms.bg} alt={cardFilms.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className={`page-header ${authorizationStatus === AuthorizationStatus.NO_AUTH ? `user-page__head` : `movie-card__head`}}`}>
          <div className="logo">
            <Link to={Pages.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="user-block">

            {authorizationStatus === AuthorizationStatus.AUTH ?
              <div className="user-block__avatar">
                <Link to={Pages.MY_LIST}>
                  <img src={authorizationInfo.avatar} alt={`${authorizationInfo.name} avatar`} width="63" height="63" />
                </Link>
              </div>
              : <Link
                to={Pages.LOGIN}
                className="user-block__link">
                Sign in
              </Link>
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={cardFilms.poster} alt={cardFilms.title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{cardFilms.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{cardFilms.genre}</span>
                <span className="movie-card__year">{cardFilms.year}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`${Pages.PLAYER}/${cardFilms.id}`} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick={() => handleFilmFavorite(cardFilms)}>
                    {isInMyLyst}
                    <span>My list</span>
                  </button> :
                  <Link to={Pages.LOGIN} className="btn btn--list movie-card__button" type="button"> {isInMyLyst} <span>My list</span> </Link>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmGenre
            genres={availableGenres}
            currentGenre={currentGenre}
            onGenreClick={onGenreClick}
            films={films}
          />

          <FilmList
            films = {showedFilms}
            onFilmCardClick = {onFilmCardClick}
          />
          {showedFilms.length >= filmOnPage.length ? null :
            <BtnLoad
              onShowMoreClick={onShowMoreClick}
            />}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};
Main.propTypes = {
  films: propTypes.arrayOf(propTypes.object).isRequired,
  showFilms: propTypes.number.isRequired,
  cardFilms: propTypes.oneOfType([
    propTypes.array.isRequired,
    propTypes.object.isRequired,
  ]),
  availableGenres: propTypes.array.isRequired,
  currentGenre: propTypes.string.isRequired,
  onGenreClick: propTypes.func.isRequired,
  filmsByGenre: propTypes.array.isRequired,
  onFilmCardClick: propTypes.func.isRequired,
  onShowMoreClick: propTypes.func.isRequired,
  handleFilmFavorite: propTypes.func.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  authorizationInfo: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  films: state.DATA.films,
  cardFilms: state.DATA.cardFilms,
  availableGenres: state.DATA.availableGenres,
  currentGenre: state.APP.currentGenre,
  filmsByGenre: state.APP.filmsByGenre,
  showFilms: state.APP.showFilms,
  authorizationStatus: state.USER.authorizationStatus,
  authorizationInfo: state.USER.authorizationInfo,
  error: state.DATA.error,
});
const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre, films) {
    dispatch(ActionCreator.choiseGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre(genre, films));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.onButtonShowClick());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
