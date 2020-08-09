import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {Operations, reducer} from './user.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};
const authorizationInfo = {
  id: 1,
  email: ``,
  name: ``,
  avatar: ``,
};
const UserActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION_INFO: `AUTHORIZATION_INFO`,
  IS_AUTHORIZING: `IS_AUTHORIZING`,
};
const api = createAPI(() => {});

describe(`Operaions User`, () => {
  it(`Should return checkAuth AUTH`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userCheckAuth = Operations.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return userCheckAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: UserActionType.REQUIRED_AUTHORIZATION,
          payload: `AUTH`,
        });
      });
  });
});

describe(`Reducer User`, () => {
  it(`Should return initital state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorizationInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatar: ``,
      },
      isAuthorizing: false
    });
  });

  it(`Return authorizationStatus after change`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: UserActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });
  });

  it(`Return user after change`, () => {
    expect(reducer({
      authorizationInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    }, {
      type: UserActionType.AUTHORIZATION_INFO,
      payload: authorizationInfo,
    })).toEqual({
      authorizationInfo,
    });
  });
});
