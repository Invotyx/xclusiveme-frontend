import { createActionTypes } from '../../utils';

export const AUTH = createActionTypes('AUTH', [
  'LOGIN',
  'REGISTER',
  'VERIFY_OTP',
  'RESEND_OTP',
  'UPDATE_PROFILE',
  'UPDATE_PASSWORD',
  'UPDATE_SUBSCRIPTION_FEE',
  'UPLOAD_IMAGE',
  'UPLOAD_COVER',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'RESET_PASSWORD_TOKEN_VERIFY',
  'GET_SESSIONS',
  'EXPIRE_ALL_SESSIONS',
  'LOGOUT',
  'SUCCESS',
  'REFRESH_TOKEN',
  'FAILURE',
  'ME',
  'REQUEST_FOLLOWERS',
  'REQUEST_FOLLOWINGS',
  'UPDATE_TWO_FACTOR_AUTHENTICATION',
  'UPDATE_AGE_LIMIT_RESTRICTION',
  'REDIRECT_TO_LOGIN_PAGE',
  'GET_COUNTRIES',
]);

export default AUTH;
