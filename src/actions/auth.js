import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

const AUTH_ENDPOINT = "/api/v1/auth";

const ENDPOINT = "http://localhost:4000";

//  Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get(AUTH_ENDPOINT);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  Register
export const register = ({ firstName, lastName, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(ENDPOINT, {
      query: `mutation {
          createUser(email:"${email}", firstName:"${firstName}", lastName:"${lastName}", password: "${password}") {
          message
        }
      }
    `,
    });

    if (res.data.errors) {
      const { errors } = res.data;
      const { message } = errors[0];
      const realErrors = JSON.parse(message);
      const errorMessage = realErrors.errors[0].message;
      throw new Error(errorMessage);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.msg, "error"));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//  Login
export const login = ({email, password}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(ENDPOINT, {
      query: `mutation {
        logUserIn(email:"${email}", password: "${password}") {
          message
          body
        }
        }
      `,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.msg, "error"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//  Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
