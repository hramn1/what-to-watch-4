import {getAvailableGenres} from '../../utils.js';
import filmAdapter from '../../adapter/film.js';
import {ALL_GENRES} from "../../const";

const extend = (a, b) => Object.assign({}, a, b);
const initialState = {
  films: [],
  cardFilms: [],
  availableGenres: [ALL_GENRES],
  filmsByGenre: [],
};
const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
};
const ActionCreator = {
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
