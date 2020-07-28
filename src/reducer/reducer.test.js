import {availableGenre} from '../utils.js';
import films from '../mocks/films.js';
import {SHOW_FILMS} from '../const.js';
import cardFilms from "../mocks/card-film.js";
import {ActionType, reducer} from './reducer.js';

const getFilmsByGenre = (selectedGenre) => {
  return films.filter((film) => film.genre === selectedGenre);
};

describe(`Reducer`, () => {
  it(`Return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      films,
      cardFilms,
      showFilms: 8,
      availableGenres: availableGenre,
      currentGenre: `All genres`,
      filmsByGenre: films,
    });
  });

  it(`Return genre after choise`, () => {
    expect(reducer({
      currentGenre: `All genres`,
    }, {
      type: ActionType.CHOISE_GENRE,
      payload: `Drame`,
    })).toEqual({
      currentGenre: `Drame`,
    });
  });

  it(`Return films by genre`, () => {
    expect(reducer({
      currentGenre: `Drame`,
      filmsByGenre: films,
    }, {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: getFilmsByGenre(`Drame`),
    })).toEqual({
      currentGenre: `Drame`,
      filmsByGenre: getFilmsByGenre(`Drame`),
    });
  });
  it(`Return showFilms`, () => {
    expect(reducer({
      showFilms: SHOW_FILMS,
    }, {
      type: ActionType.SHOW_FILMS,
      payload: 8,
    })).toEqual({
      showFilms: 8,
    });
  });
});
