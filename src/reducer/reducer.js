import films from '../mocks/films.js';
import {ALL_GENRES, SHOW_FILMS} from '../const.js';
import {availableGenre} from '../utils.js';
import cardFilms from "../mocks/card-film.js";

const extend = (a, b) => Object.assign({}, a, b);
const initialState = {
  films,
  cardFilms,
  currentGenre: ALL_GENRES,
  availableGenres: availableGenre,
  filmsByGenre: films,
  showFilms: SHOW_FILMS,
};
const ActionType = {
  CHOISE_GENRE: `CHOISE_GENRES`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
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

  getFilmsByGenre: (selectedGenre = ALL_GENRES) => {
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
  }

  return state;
};


export {ActionType, ActionCreator, reducer};
