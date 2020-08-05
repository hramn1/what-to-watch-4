import React from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app.js';
import FilmList from "../movie-list/movie-list.jsx";
import FilmGenre from "../movie-genre/movie-genre.jsx";
import BtnLoad from "../btn-load/btn-load.jsx";

const Main = (props) => {
  const {films, cardFilms, filmsByGenre, availableGenres, currentGenre, onPlayClick, onTitleClick, onShowMoreClick, onGenreClick, showFilms, onFilmCardClick} = props;
  let showedFilms = [];
  if (filmsByGenre.length === 0) {
    showedFilms = films.slice(0, showFilms);
  } else {
    showedFilms = filmsByGenre.slice(0, showFilms);
  }
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="{nameFilm}" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a onClick={onTitleClick} href="#" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
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
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayClick(cardFilms)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
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
          {showedFilms.length === films.length ? null :
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
  onTitleClick: propTypes.func.isRequired,
  filmsByGenre: propTypes.array.isRequired,
  onFilmCardClick: propTypes.func.isRequired,
  onShowMoreClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  films: state.DATA.films,
  cardFilms: state.DATA.cardFilms,
  availableGenres: state.DATA.availableGenres,
  currentGenre: state.APP.currentGenre,
  filmsByGenre: state.APP.filmsByGenre,
  showFilms: state.APP.showFilms,
});
const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre, films) {
    dispatch(ActionCreator.choiseGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre(genre, films));
  },
  onShowMoreClick() {
    dispatch(ActionCreator.onButtonShowClick());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
