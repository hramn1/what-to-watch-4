import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import App from './app.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);
const availableGenres = [`crime`, `drama`];
const authorizationStatus = `NO-AUTH`;
const authorizationInfo = {};
const review = [];
const loadingFilms = true;
const error = ``;
const films = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `crime`,
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    genre: `Drame`,
  },
];
const cardFilms = {
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  year: `2014`,
};
const filmsByGenre = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `crime`,
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    genre: `Drame`,
  },
];
const showFilms = 8;
describe(`App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      cardFilms,
      availableGenres,
      filmsByGenre,
      review,
      loadingFilms,
      error
    },
    [NameSpace.APP]: {
      currentGenre: ALL_GENRES,
      showFilms,
      filmsByGenre,
    },
    [NameSpace.USER]: {
      authorizationStatus,
      authorizationInfo
    },
  });

  it(`Render`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
