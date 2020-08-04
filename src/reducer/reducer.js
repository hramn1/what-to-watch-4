// import films from '../mocks/films.js';
import {ALL_GENRES, SHOW_FILMS} from '../const.js';
import {getAvailableGenres} from '../utils.js';
// import cardFilms from "../mocks/card-film.js";
import filmAdapter from '../adapter/film.js';

const extend = (a, b) => Object.assign({}, a, b);

const ActionType = {
  CHOISE_GENRE: `CHOISE_GENRES`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
};
const ActionCreator = {
  choiseGenre: (genre) => ({
    type: ActionType.CHOISE_GENRE,
    payload: genre,
  }),
  onButtonShowClick: () => ({
    type: ActionType.SHOW_MORE,
    payload: SHOW_FILMS + SHOW_FILMS,
  }),

  getFilmsByGenre: (selectedGenre = ALL_GENRES, films) => {
    console.log(films)
    let filmsByGenre = films;
    if (selectedGenre !== ALL_GENRES) {
      filmsByGenre = films
        .filter((film) => film.genre === selectedGenre);
    }

    return {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: filmsByGenre,
    };
  },
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),
};
const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film)))));
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((responce) => dispatch(ActionCreator.loadPromo(filmAdapter(responce.data))));
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOISE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GET_FILMS_BY_GENRE:
      return extend(state, {
        filmsByGenre: action.payload,
      });

    case ActionType.SHOW_MORE:
      return extend(state, {
        showFilms: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
        filmsByGenre: action.payload,
        availableGenres: getAvailableGenres(action.payload),
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        cardFilms: action.payload,
      });
  }

  return state;
};


export {ActionType, ActionCreator, Operations, reducer};
