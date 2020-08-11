import React from "react";
import renderer from "react-test-renderer";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import Main from "./main";
import NameSpace from '../../reducer/name-space.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);
const availableGenres = [`crime`, `drama`];
const films = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
  },
];
const cardFilms = {
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  year: `2014`,
};
const error = ``;
const showFilms = 2;
const authorizationStatus = `NO-AUTH`;
const authorizationInfo = {};
describe(`Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      cardFilms,
      availableGenres,
      error,
    },
    [NameSpace.APP]: {
      currentGenre: ALL_GENRES,
      filmsByGenre: films,
      showFilms,
    },
    [NameSpace.USER]: {
      authorizationStatus,
      authorizationInfo
    },
  });

  it(`Render Main`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <Main
              onFilmCardClick={() => {}}
              onPlayClick = {()=>{}}
              handleFilmFavorite= {()=>{}}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
