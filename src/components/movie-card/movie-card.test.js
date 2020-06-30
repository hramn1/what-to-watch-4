import React from "react";
import renderer from "react-test-renderer";
import MovieCard from './movie-card.jsx';

const titles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];
for(let item of titles) {
it(`MovieCard rendering`, () => {
  const tree = renderer
.create(<MovieCard
  title = {item}
/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
}
