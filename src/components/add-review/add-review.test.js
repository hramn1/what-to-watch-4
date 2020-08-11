import React from "react";
import renderer from "react-test-renderer";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AddReview from "./add-review.jsx";
import NameSpace from '../../reducer/name-space.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);
const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drame`,
  year: `2014`,
};
const ReviewLength = {
  MIN: 50,
  MAX: 400,
};
const isSubmitDisabled = true;
const authorizationStatus = `NO-AUTH`;
const authorizationInfo = {};
const sendingComment = true;
const isError = ``;
describe(`Main`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus,
      authorizationInfo
    },
    [NameSpace.DATA]: {
      sendingComment,
      isError,
    },
  });

  it(`Render Main`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              film={film}
              postReview={() => {}}
              onSignInClick={()=>{}}
              reviewLength={ReviewLength}
              onSubmitClick={()=>{}}
              onRatingChange={()=>{}}
              onReviewChange={()=>{}}
              isSubmitDisabled={isSubmitDisabled}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
