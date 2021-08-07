import SecureStore from 'utils/secureStore';
import { updateLoginState } from 'reduxActions/auth/authReducer';
import { createAccessToken } from 'clients/auth';

export async function execute(api: any, callback: (...funcArgs: any) => Promise<any>): Promise<any> {
  try {
    return await callback();
  } catch(e) {
    if (e.code !== 'jwt-expired') {
      return api.rejectWithValue(e);
    }
  }

  try {
    const jwt = await createAccessToken();
    await SecureStore.setItem('access-token', jwt);
  } catch(e) {
    api.dispatch(updateLoginState(false));
    throw e;
  }

  return callback();
}