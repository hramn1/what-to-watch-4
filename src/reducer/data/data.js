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
  sendingComment: false,
  loadingFilms: true,
  error: ``,
  errorComment: ``,
};
const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_REVIEW: `LOAD_REVIEW`,
  POST_REVIEW: `POST_REVIEW`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  IS_LOADING_FILM: `IS_LOADING_FILM`,
  ERROR_SERVER: `ERROR_SERVER`,
  SEND_COMMENT_DONE: `SEND_COMMENT_DONE`,
  ERROR_COMMENT: `ERROR_COMMENT`,
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
  isLoadingFilm: (load) => ({
    type: ActionType.IS_LOADING_FILM,
    payload: load,
  }),
  serverError: (msg) => ({
    type: ActionType.ERROR_SERVER,
    payload: msg,
  }),
  sendCommentDone: (done) => ({
    type: ActionType.SEND_COMMENT_DONE,
    payload: done,
  }),
  commentError: (msg) => ({
    type: ActionType.ERROR_COMMENT,
    payload: msg,
  }),
};
const Operations = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => {
        dispatch(ActionCreator.loadFilms(responce.data.map((film) => filmAdapter(film))));
        dispatch(ActionCreator.isLoadingFilm(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.serverError(err));
      });
  },

  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((responce) => dispatch(ActionCreator.loadPromo(filmAdapter(responce.data))));
  },
  loadReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
        dispatch(ActionCreator.sendCommentDone(false));

      });
  },
  postReview: (movieId, reviewData) => (dispatch, getState, api) => {
    return api.post(`/comments/${movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then((response) => {
        dispatch(ActionCreator.sendCommentDone(true));
        dispatch(ActionCreator.loadReviews(response.data));
      })
      .catch((err) =>{
        dispatch(ActionCreator.commentError(err));
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
    case ActionType.IS_LOADING_FILM:
      return extend(state, {
        loadingFilms: action.payload,
      });
    case ActionType.ERROR_SERVER:
      return extend(state, {
        error: action.payload,
      });
    case ActionType.SEND_COMMENT_DONE:
      return extend(state, {
        sendingComment: action.payload,
      });
    case ActionType.ERROR_COMMENT:
      return extend(state, {
        errorComment: action.payload,
      });
  }
  return state;
};
export {ActionType, ActionCreator, initialState, Operations, reducer};
