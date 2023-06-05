import axios from "axios";
import {url} from "../utils/link";
import {setUser} from "../reducers/useReducer";

export const registration = async ( email, password, IdInstance, ApiTokenInstance ) => {
  try {
    const response = await axios.post(`${url}/api/auth/registration`, {
      email,
      password,
      IdInstance,
      ApiTokenInstance
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const login = ( email, password ) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${url}/api/auth/login`, {
        email,
        password
      })
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${url}/api/auth/auth`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      alert(e.response.data.message);
      localStorage.removeItem('token')
    }
  }
}