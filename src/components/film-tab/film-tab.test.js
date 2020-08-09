import React from 'react';
import renderer from 'react-test-renderer';
import FilmsTabs from './film-tab.jsx';

const FilmsNavList = [`Overview`, `Details`, `Reviews`];

describe(`FilmsTabs`, () => {
  it(`Render FilmsTabs`, () => {
    const tree = renderer.create(
        <FilmsTabs
          tabs={FilmsNavList}
          currentTab={FilmsNavList[0]}
          onTabClick={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
