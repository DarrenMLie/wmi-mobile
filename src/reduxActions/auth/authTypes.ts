export interface AuthState {
  isAuthenticated: boolean;
}

export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';

export interface UpdateLoginStateAction {
  type: typeof UPDATE_LOGIN_STATE;
  isAuthenticated: boolean;
}

export type AuthActionTypes = UpdateLoginStateAction;
