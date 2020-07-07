import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});
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
it(`Should list items be clicked on genre`, () => {
  const onTitleClick = jest.fn();
  const main = shallow(
      <Main
        films = {films}
        cardFilms = {cardFilms}
        onTitleClick={onTitleClick}
      />);

  const welcomeButton = main.find(`.logo__link`).first();
  welcomeButton.props().onClick();
  expect(onTitleClick.mock.calls.length).toBe(1);
});
