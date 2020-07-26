import React from 'react';
import renderer from 'react-test-renderer';
import FilmGenre from './movie-genre.jsx';

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

describe(`FilmGenre`, () => {
  it(`Render FilmGenre`, () => {
    const tree = renderer.create(
        <FilmGenre
          genres={FilmGenreList}
          currentGenre={FilmGenreList[0]}
          onGenreClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
