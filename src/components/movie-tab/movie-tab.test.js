import React from 'react';
import renderer from 'react-test-renderer';
import MovieTabs from './movie-tab.jsx';

const MovieNavList = [`Overview`, `Details`, `Reviews`];

describe(`MovieTabs`, () => {
  it(`Render MovieTabs`, () => {
    const tree = renderer.create(
        <MovieTabs
          tabs={MovieNavList}
          currentTab={MovieNavList[0]}
          onTabClick={() => {}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
