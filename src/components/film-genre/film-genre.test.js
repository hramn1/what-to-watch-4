import React from 'react';
import renderer from 'react-test-renderer';
import FilmGenre from './film-genre.jsx';

const FilmGenreList = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];
const films = [
  {
    id: `1`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `crime`,
  },
  {
    id: `2`,
    title: `Bohemian Rhapsody`,
    poster: `img/bohemian-rhapsody.jpg`,
    genre: `Drame`,
  },
];
describe(`FilmGenre`, () => {
  it(`Render FilmGenre`, () => {
    const tree = renderer.create(
        <FilmGenre
          films={films}
          genres={FilmGenreList}
          currentGenre={FilmGenreList[0]}
          onGenreClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
