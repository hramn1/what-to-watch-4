import React from 'react';
import renderer from 'react-test-renderer';
import BtnLoad from './btn-load.jsx';

describe(`BtnLoad`, () => {
  it(`Render BtnLoad`, () => {
    const tree = renderer.create(
        <BtnLoad
          onShowMoreClick ={()=>{}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
