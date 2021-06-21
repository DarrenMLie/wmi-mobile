import {
  AuthState,
  AuthActionTypes,
  UPDATE_LOGIN_STATE,
} from './authTypes';

const initialState = {
  isAuthenticated: false,
};

function authReducer(
  state: AuthState = initialState,
  action: AuthActionTypes,
): AuthState {
  switch(action.type) {
    case UPDATE_LOGIN_STATE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}

export default authReducer;
