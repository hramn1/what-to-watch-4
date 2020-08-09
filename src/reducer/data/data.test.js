import MockAdapter from 'axios-mock-adapter';
import {initialState, reducer, Operations} from './data';
import {createAPI} from '../../api';
import filmAdapter from '../../adapter/film';
import {ALL_GENRES} from "../../const";


const testMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  bgImage: `img/bg-the-grand-budapest-hotel.jpg`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

const testMovies = [
  {
    id: 0,
    title: `The Grand Budapest Hotel`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImg: `img/bg-the-grand-budapest-hotel.jpg`,
    genre: `drama`
  },
  {
    id: 1,
    title: `The Grand Budapest Hotel`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImg: `img/bg-the-grand-budapest-hotel.jpg`,
    genre: `drama`
  },
  {
    id: 2,
    title: `The Grand Budapest Hotel`,
    poster: `img/the-grand-budapest-hotel-poster.jpg`,
    previewImg: `img/bg-the-grand-budapest-hotel.jpg`,
    genre: `drama`
  }
];
const genres = [ALL_GENRES, `drama`];
const testReviews = [
  {
    id: 1,
    user: {},
    date: `December 24, 2016`,
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years`,
  },
  {
    id: 2,
    user: {},
    date: `November 18, 2015`,
    rating: 8.0,
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  },
];
const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_REVIEW: `LOAD_REVIEW`,
};
const api = createAPI(() => {});

describe(`Data Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update PromoMovie by load`, () => {
    expect(reducer({
      films: [],
    }, {
      type: ActionType.LOAD_FILMS,
      payload: testMovies,
    })).toEqual({
      films: testMovies,
      filmsByGenre: testMovies,
      availableGenres: genres
    });
  });

  it(`Reducer should update movies by load`, () => {
    expect(reducer({
      cardFilms: [],
    }, {
      type: ActionType.LOAD_PROMO,
      payload: testMovie,
    })).toEqual({
      cardFilms: testMovie,
    });
  });

  it(`Reducer should update reviews by load`, () => {
    expect(reducer({
      review: [],
    }, {
      type: ActionType.LOAD_REVIEW,
      payload: testReviews,
    })).toEqual({
      review: testReviews,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const activeMovieLoad = Operations.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return activeMovieLoad(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_PROMO,
              payload: filmAdapter({fake: true}),
            });
          });
  });

  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoad = Operations.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoad(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_FILMS,
              payload: [filmAdapter({fake: true})],
            });
          });
  });

  it(`Should make a correct API call to /comments/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoad = Operations.loadReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoad(dispatch, () => {}, api)
          .then(() => {
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledWith({
              type: ActionType.LOAD_REVIEW,
              payload: [{fake: true}],
            });
          });
  });
});
