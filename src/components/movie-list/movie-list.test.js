import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-list.jsx";
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
const onMovieCardClick = () => {};

it(`MoviesList rendering`, () => {
  const tree = renderer
.create(<MovieList
  films = {films}
  cardFilms = {cardFilms}
  onMovieCardClick={onMovieCardClick}
/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
