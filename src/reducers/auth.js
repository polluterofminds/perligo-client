import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  LOGOUT, 
  EMAIL_NOT_VERIFIED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), 
  isAuthenticated: null, 
  emailVerified: false,
  loading: true, 
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case USER_LOADED: 
      return {
        ...state, 
        isAuthenticated: true, 
        loading: false, 
        token: payload.token,
        user: payload.user
      }
    case REGISTER_SUCCESS: 
      return {
        ...state, 
        payload,
        isAuthenticated: true, 
        emailVerified: false
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state, 
        payload, 
        user: payload.user, 
        token: payload.token,
        isAuthenticated: true, 
        emailVerified: payload.user.emailVerified
      }
    case REGISTER_FAIL: 
    case AUTH_ERROR: 
    case LOGIN_FAIL: 
    case LOGOUT: 
      localStorage.removeItem('token');
      return {
        ...state, 
        token: null,
        isAuthenticated: false, 
        loading: false
      }
    case EMAIL_NOT_VERIFIED: 
      localStorage.setItem('token', payload.token);
      return {
        ...state, 
        user: payload.user,
        token: payload.token,
        isAuthenticated: true, 
        loading: false, 
        emailVerified: false
      }
    default: 
      return state
  }
}