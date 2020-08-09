import {getAvailableGenres} from '../../utils.js';
import filmAdapter from '../../adapter/film.js';
import {ALL_GENRES} from "../../const";

const extend = (a, b) => Object.assign({}, a, b);
const initialState = {
  films: [],
  cardFilms: [],
  availableGenres: [ALL_GENRES],
  filmsByGenre: [],
  review: [],
  favoriteFilms: [],
};
const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_REVIEW: `LOAD_REVIEW`,
  POST_REVIEW: `POST_REVIEW`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
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

  loadReviews: (review) => ({
    type: ActionType.LOAD_REVIEW,
    payload: review,
  }),
  loadFavoriteFilms: (films) => ({
    type: ActionType.LOAD_FAVORITE_FILMS,
    payload: films,
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
  loadReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
  postReview: (movieId, reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/${movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.review,
    })
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
  putFavorite: (film, isFavorite) => (dispatch, getState, api) => {
    const status = isFavorite ? 0 : 1;
    return api.post(`/favorite/${film.id}/${status}`)
      .then(() => {
        dispatch(Operations.loadFilms());
        dispatch(Operations.loadPromo());
      });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data.map((film) => filmAdapter(film))));
      })
      .catch((err) => {
        throw err;
      });
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
    case ActionType.LOAD_REVIEW:
      return extend(state, {
        review: action.payload,
      });
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });
  }
  return state;
};
export {ActionType, ActionCreator, initialState, Operations, reducer};
