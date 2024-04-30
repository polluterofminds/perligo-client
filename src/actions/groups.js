import { GROUPS_LOADED } from '../actions/types';
import { setAlert } from "./alert";
import jwt from 'jsonwebtoken';
import axios from 'axios';

const ENDPOINT = "http://localhost:4000";

export const fetchGroups = () => async (dispatch) => {
  try {
    const token = localStorage.token;
    const decoded = jwt.decode(token);
    const { user } = decoded;

    const res = await axios.post(ENDPOINT, {      
      query: `query {
          getGroupsByMember(id: "${user.id}") {
          message, 
          body
        }
      }
    `,
    });

    console.log(JSON.parse(res.data.data.getGroupsByMember.body))
    if(res.data.errors) {
      throw new Error(res.data.errors)
    } 

    dispatch({
      type: GROUPS_LOADED, 
      payload: res.data.data.getGroupsByMember.body
    });
  } catch (error) {
    dispatch(setAlert(error.msg, "error"));
  }
}

export const createGroup = ({name, privateGroup}) => async(dispatch) => {
  console.log("Creating")
  try {
    const token = localStorage.token;
    const decoded = jwt.decode(token);
    const { user } = decoded;

    const res = await axios.post(ENDPOINT, {      
      query: `mutation {
          createGroup(name: "${name}", admin: "${user.id}") {
          message, 
          body
        }
      }
    `,
    });

    console.log(res.data);

    if(res.data.errors) {
      throw new Error(res.data.errors)
    }

    dispatch(fetchGroups())
  } catch (error) {
    dispatch(setAlert(error.msg, "error"));
  }
}