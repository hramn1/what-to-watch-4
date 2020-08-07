import React from "react";
import renderer from "react-test-renderer";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import PageAddOverview from "./add-review.jsx";
import NameSpace from '../../reducer/name-space.js';
const mockStore = configureStore([]);

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  year: `2014`,
};
const authorizationStatus = `NO-AUTH`;
const authorizationInfo = {};
describe(`Main`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus,
      authorizationInfo
    },
  });

  it(`Render Main`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <PageAddOverview
            film={film}
            postReview={() => {}}
            onSignInClick={()=>{}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
