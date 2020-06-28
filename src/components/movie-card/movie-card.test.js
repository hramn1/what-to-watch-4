import React from "react";
import renderer from "react-test-renderer";
import MovieCard from './movie-card.jsx';

const titles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
it(`MovieCard rendering`, () => {
  const tree = renderer
.create(<MovieCard
  nameFilm = {titles}
/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
