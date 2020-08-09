import {reducer} from './app';

import {ALL_GENRES, SHOW_FILMS} from '../../const.js';

let countBtnClick = 1;
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
    payload: SHOW_FILMS * (++countBtnClick),
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
it(`Returns initial state at application start`, ()=>{
  expect(reducer(void 0, {})).toEqual({
    currentGenre: ALL_GENRES,
    showFilms: SHOW_FILMS,
    filmsByGenre: []}
  );
});

it(`Change genre`, ()=>{
  expect(reducer({
    currentGenre: `All genres`,
  }, {
    type: ActionType.CHOISE_GENRES,
    payload: `All genres`,
  })).toEqual({
    currentGenre: `All genres`,
  });
});

it(`Reducer should show more movie cards by butoon click`, () => {
  expect(reducer({
    showFilms: SHOW_FILMS,
  }, {
    type: ActionType.SHOW_MORE_MOVIES,
    payload: SHOW_FILMS,
  })).toEqual({
    showFilms: SHOW_FILMS,
  });
});


describe(`Action creators work correctly`, () => {
  it(`Action creators get active genre`, () => {
    expect(ActionCreator.choiseGenre(`Drama`)).toEqual({
      type: ActionType.CHOISE_GENRE,
      payload: `Drama`,
    });
  });
  it(`Action creator for showing more movie cards returns correct movie cards number`, () => {
    expect(ActionCreator.onButtonShowClick()).toEqual({
      type: ActionType.SHOW_MORE,
      payload: 16,
    });
  });
});
