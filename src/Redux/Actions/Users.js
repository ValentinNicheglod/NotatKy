import axios from 'axios';
import {useHistory} from 'react-router-dom'

import {
	DARK_MODE,
    GET_ALL_USERS,
    GET_ONE_USER,
    CREATE_USER,
	LOGIN,
	LOGOUT,
    UPDATE_USER,
} from '../Constants/Index';



export const getOneUser = (id) => {
	return (dispatch) => {
		try {
			axios.get(`/user/${id}`, {credentials: 'include'})
			.then((response) => dispatch({
				type: GET_ONE_USER,
	  			user: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const getAllUsers = (userId) => {
	return (dispatch) => {
		try {
			axios.get(`/user/all/${userId}`)
			.then((response) => dispatch({
				type: GET_ALL_USERS,
				users: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const createUser = (data) => {
	return (dispatch) => {
		try {
			axios.post(`/user/${data.id}`, {data})
			.then((response) => dispatch({
				type: CREATE_USER,
				user: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateUser = (data) => {
	return (dispatch) => {
		try {
			axios.put(`/user/${data.id}`, {data})
			.then((response) => {
				dispatch({
				type: UPDATE_USER,
				user: response.data
				})			
			});
		} catch (err) {
			console.log(err);
		}
	};
};

// User preferences

export const setDarkMode = (data) => {
	return (dispatch) => {
		try {
			localStorage.setItem('darkMode', data)
			dispatch({
				type: DARK_MODE,
				darkMode: data
			})
		} catch (err) {
			console.log(err);
		}
	};
};

export const login = (user) => {
    return async (dispatch) => {
      try {
        axios.post(`/auth/login`, user)
		.then((response) => {
			dispatch({
				type: LOGIN,
				token: response.data.token
			})
			sessionStorage.setItem("token", response.data.token)
		})
      } catch (err) {
        console.log(err);
      }
    };
  };

export const logout = () => {
	console.log("jijijij")
	return (dispatch) => {
		try {
			dispatch({
				type: LOGOUT,
				logged: false
			})
			sessionStorage.clear()
		} catch (err) {
			console.log(err);
		}
	};
};
