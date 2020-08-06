import React from "react";
import renderer from "react-test-renderer";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import Main from "./main";
import NameSpace from '../../reducer/name-space.js';
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
const showFilms = 2;
const authorizationStatus = `NO-AUTH`;
const authorizationInfo = [];
describe(`Main`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      films,
      cardFilms,
      availableGenres,
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
        <Provider store={store}>
          <Main
            onTitleClick={() => {}}
            onFilmCardClick={() => {}}
            onPlayClick = {()=>{}}
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
