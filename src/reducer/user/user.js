import createUserInfo from "../../adapter/user";

const extend = (a, b) => Object.assign({}, a, b);

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isAuthorizing: false,
  authorizationInProgress: false,
  authorizationInfo: {
    id: 0,
    email: ``,
    name: ``,
    avatar: ``,
  }};

const UserActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION_INFO: `AUTHORIZATION_INFO`,
  SET_PROGRESS_STATUS: `SET_PROGRESS_STATUS`,
  IS_AUTHORIZING: `IS_AUTHORIZING`,
};
const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: UserActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setProgressStatus: (status) => {
    return {
      type: UserActionType.SET_PROGRESS_STATUS,
      payload: status,
    };
  },

  loadAuthorizationInfo: (info) => {
    return {
      type: UserActionType.AUTHORIZATION_INFO,
      payload: info
    };
  },

  isAuthorizing: (bool) => ({
    type: UserActionType.IS_AUTHORIZING,
    payload: bool,
  }),
};
const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadAuthorizationInfo(createUserInfo(response.data)));
        dispatch(ActionCreator.setProgressStatus(true));
      })
      .catch((err) => {
        dispatch(ActionCreator.setProgressStatus(true));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadAuthorizationInfo(createUserInfo(response.data)));
        dispatch(ActionCreator.isAuthorizing(false));
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case UserActionType.AUTHORIZATION_INFO:
      return extend(state, {
        authorizationInfo: action.payload
      });
    case UserActionType.IS_AUTHORIZING:
      return extend(state, {
        isAuthorizing: true,
      });
    case UserActionType.SET_PROGRESS_STATUS:
      return extend(state, {
        authorizationInProgress: action.payload,
      });
  }

  return state;
};

export {reducer, ActionCreator, initialState, AuthorizationStatus, Operations};
