import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import Main from './main.jsx';
import NameSpace from '../../reducer/name-space.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const availableGenres = [`crime`, `drama`];
Enzyme.configure({
  adapter: new Adapter(),
});
const mockStore = configureStore([]);
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
const authorizationInfo = {};
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

  it(`Should list items be clicked on genre`, () => {
    const onFilmCardClick = jest.fn();
    const main = mount(
        <Router history={history}>
          <Provider store={store}>
            <Main
              onFilmCardClick={onFilmCardClick}
              onPlayClick = {()=>{}}
              handleFilmFavorite= {()=>{}}
            />
          </Provider>
        </Router>
    );
    const welcomeButton = main.find(`.small-movie-card`).first();
    welcomeButton.props().onClick();
    expect(onFilmCardClick.mock.calls.length).toBe(1);
  });
});
