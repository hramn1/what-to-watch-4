import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
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
const onTitleClick = () => {};
it(`Main rendering`, () => {
  const tree = renderer
.create(<Main
  films = {films}
  cardFilms = {cardFilms}
  onTitleClick={onTitleClick}
  onFilmCardClick = {()=>{}}
/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
