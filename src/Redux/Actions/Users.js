import axios from 'axios';

import {
	DARK_MODE,
    GET_ALL_USERS,
    GET_ONE_USER,
    CREATE_USER,
    UPDATE_USER,
} from '../Constants/Index';

export const getOneUser = (id) => {
	return (dispatch) => {
		try {
			axios.get(`/user/${id}`)
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
			console.log(data)
			axios.put(`/user/${data.id}`, {data})
			.then((response) => {
				dispatch({
				type: UPDATE_USER,
				user: response.data
				})
				console.log(response.data)
			
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
			/* dispatch({
				type: DARK_MODE,
				darkMode: data
			}) */
			localStorage.setItem("darkMode", data)
		} catch (err) {
			console.log(err);
		}
	};
};
