import axios from 'axios';

import {
    GET_ALL_TAGS,
    GET_ONE_TAG,
    CREATE_TAG,
    UPDATE_TAG,
    DELETE_TAG
} from '../Constants/Index';

export const getOneTag = (id) => {
	return (dispatch) => {
		try {
			axios.get(`/tag/${id}`)
			.then((response) => dispatch({
				type: GET_ONE_TAG,
	  			tag: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const getAllTags = (userId) => {
	return (dispatch) => {
		try {
			axios.get(`/tag/all/${userId}`)
			.then((response) => {
				dispatch({
				type: GET_ALL_TAGS,
				tags: response.data
			})});
		} catch (err) {
			console.log(err);
		}
	};
};

export const createTag = (data, id) => {
	return (dispatch) => {
		try {
			axios.post(`/tag/${id}`, {data})
			.then((response) => dispatch({
				type: CREATE_TAG,
				tag: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateTag = (data) => {
	return (dispatch) => {
		try {
			axios.put(`/tag/${data.id}`, {data})
			.then((response) => dispatch({
				type: UPDATE_TAG,
				tag: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const deleteTag = (id) => {
	return (dispatch) => {
		try {
			axios.delete(`/tag/${id}`)
			.then((response) => dispatch({
				type: DELETE_TAG,
				message: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

