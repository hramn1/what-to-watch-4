import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const Settings = {
  NAME_FILM: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`],
  GENRE: `Drama`,
  YEAR: `2014`,
};
const onTitleClick = () => {};

it(`Render App`, () => {
  const tree = renderer
  .create(<App
    nameFilm = {Settings.NAME_FILM}
    genreFilm = {Settings.GENRE}
    yearFilm = {Settings.YEAR}
    onTitleClick={onTitleClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
