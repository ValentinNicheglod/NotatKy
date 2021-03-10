import axios from 'axios';

import {
    GET_ALL_COLLECTIONS,
    GET_ONE_COLLECTION,
    CREATE_COLLECTION,
    UPDATE_COLLECTION,
    DELETE_COLLECTION
} from '../Constants/Index';

export const getOneCollection = (id) => {
	return (dispatch) => {
		try {
			axios.get(`/collection/${id}`)
			.then((response) => dispatch({
				type: GET_ONE_COLLECTION,
	  			collection: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const getAllCollections = (userId) => {
	return (dispatch) => {
		try {
			axios.get(`/collection/all/${userId}`)
			.then((response) => dispatch({
				type: GET_ALL_COLLECTIONS,
				collections: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const createCollection = (data, userId) => {
	return (dispatch) => {
		try {
			axios.post(`/collection/${userId}`, {data})
			.then((response) => dispatch({
				type: CREATE_COLLECTION,
				collection: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateCollection = (data) => {
	return (dispatch) => {
		console.log(data)
		try {
			axios.put(`/collection/${data.id}`, {data})
			.then((response) => dispatch({
				type: UPDATE_COLLECTION,
				collection: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const deleteCollection = (id) => {
	return (dispatch) => {
		try {
			axios.delete(`/collection/${id}`)
			.then((response) => dispatch({
				type: DELETE_COLLECTION,
				message: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};