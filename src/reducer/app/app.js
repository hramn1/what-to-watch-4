import {ALL_GENRES, SHOW_FILMS} from '../../const.js';

const extend = (a, b) => Object.assign({}, a, b);
const initialState = {
  currentGenre: ALL_GENRES,
  showFilms: SHOW_FILMS,
  filmsByGenre: [],
};

const ActionType = {
  CHOISE_GENRE: `CHOISE_GENRES`,
  GET_FILMS_BY_GENRE: `GET_FILMS_BY_GENRE`,
  SHOW_MORE: `SHOW_MORE`,
  RESET_BTN: `RESET_BTN`,
};
const ActionCreator = {
  choiseGenre: (genre) => ({
    type: ActionType.CHOISE_GENRE,
    payload: genre,
  }),
  onButtonShowClick: () => ({
    type: ActionType.SHOW_MORE,
    payload: SHOW_FILMS,
  }),
  resetShowMoreBtn: () => ({
    type: ActionType.RESET_BTN,
    payload: SHOW_FILMS,
  }),
  getFilmsByGenre: (selectedGenre = ALL_GENRES, films) => {
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
        showFilms: SHOW_FILMS,
      });
    case ActionType.RESET_BTN:
      return extend(state, {
        showFilms: action.payload,
      });

    case ActionType.SHOW_MORE:
      return extend(state, {
        showFilms: action.payload + state.showFilms,
      });


  }

  return state;
};


export {ActionType, ActionCreator, reducer};
