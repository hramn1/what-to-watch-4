import React from "react";
import renderer from "react-test-renderer";
import FilmList from "./film-list.jsx";
import {Router} from 'react-router-dom';
import history from '../../history.js';
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
const onFilmCardClick = () => {};

it(`FilmList rendering`, () => {
  const tree = renderer
.create(
    <Router history={history}>
      <FilmList
        films = {films}
        cardFilms = {cardFilms}
        onFilmCardClick={onFilmCardClick}
      />
    </Router>
)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
