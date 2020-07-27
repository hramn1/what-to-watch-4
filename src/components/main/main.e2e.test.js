import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {ALL_GENRES} from '../../const.js';
import {availableGenre} from '../../utils.js';
import Main from './main.jsx';

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
describe(`Main`, () => {
  const store = mockStore({
    films,
    cardFilms,
    availableGenres: availableGenre,
    currentGenre: ALL_GENRES,
    filmsByGenre: films,
  });

  it(`Should list items be clicked on genre`, () => {
    const onTitleClick = jest.fn();
    const main = mount(
        <Provider store={store}>
          <Main
            onTitleClick={onTitleClick}
            onFilmCardClick={() => {}}
          />
        </Provider>
    );
    const welcomeButton = main.find(`.logo__link`).first();
    welcomeButton.props().onClick();
    expect(onTitleClick.mock.calls.length).toBe(1);
  });
});
