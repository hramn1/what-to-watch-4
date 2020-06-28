import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});
const Settings = {
  NAME_FILM: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`],
  GENRE: `Drama`,
  YEAR: `2014`,
};
it(`Should list items be clicked on genre`, () => {
  const onTitleClick = jest.fn();

  const main = shallow(
      <Main
        nameFilm = {Settings.NAME_FILM}
        genreFilm = {Settings.GENRE}
        yearFilm = {Settings.YEAR}
        onTitleClick={onTitleClick}

      />);

  const welcomeButton = main.find(`.logo__link`).first();
  welcomeButton.props().onClick();
  expect(onTitleClick.mock.calls.length).toBe(1);
});
