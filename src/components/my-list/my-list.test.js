import React from "react";
import renderer from "react-test-renderer";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import MyList from "./my-list.jsx";
import NameSpace from '../../reducer/name-space.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {createAPI} from '../../api.js';

const api = createAPI();

const mockStore = configureStore([
  thunk.withExtraArgument(api)
]);
const availableGenres = [`crime`, `drama`];
const favoriteFilms = [
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
const authorizationInfo = {};
describe(`MyList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      cardFilms,
      availableGenres,
      favoriteFilms,
    },
    [NameSpace.APP]: {
      currentGenre: ALL_GENRES,
      showFilms,
    },
    [NameSpace.USER]: {
      authorizationStatus,
      authorizationInfo
    },
  });

  it(`Render Mylist`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <MyList
              onFilmCardClick={() => {}}
              onPlayClick = {()=>{}}
              handleFilmFavorite= {()=>{}}
              loadFavoriteMovies={()=>{}}
              films={favoriteFilms}
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
