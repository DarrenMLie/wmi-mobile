import {
  UPDATE_LOGIN_STATE,
  UpdateLoginStateAction,
} from './authTypes';

export function updateLoginState(isAuthenticated: boolean): UpdateLoginStateAction {
  return {
    type: UPDATE_LOGIN_STATE,
    isAuthenticated,
  };
}
