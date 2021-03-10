import axios from 'axios';

import {
	ADD_NOTE_TAG,
	CHANGE_NOTE_STATE,
	DELETE_NOTE_TAG,
    GET_ALL_NOTES,
    GET_ONE_NOTE,
    CREATE_NOTE,
    UPDATE_NOTE,
    DELETE_NOTE
} from '../Constants/Index';

export const getOneNote = (id) => {
	return (dispatch) => {
		try {
			axios.get(`/note/${id}`)
			.then((response) => dispatch({
				type: GET_ONE_NOTE,
	  			note: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const getAllNotes = (userId) => {
	return (dispatch) => {
		try {
			axios.get(`/note/all/${userId}`)
			.then((response) => dispatch({
				type: GET_ALL_NOTES,
				notes: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const createNote = (data, userId) => {
	return (dispatch) => {
		try {
			console.log(data)
			axios.post(`/note/${userId}`, {data})
			.then((response) => dispatch({
				type: CREATE_NOTE,
				note: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateNote = (data) => {
	return (dispatch) => {
		try {
			axios.put(`/note/${data.id}`, {data})
			.then((response) => dispatch({
				type: UPDATE_NOTE,
				note: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const updateNoteState = (data) => {
	return (dispatch) => {
		try {
			axios.put(`/note/state/${data.id}`, {data})
			.then((response) => dispatch({
				type: CHANGE_NOTE_STATE,
				notes: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const deleteNote = (noteId, userId) => {
	return (dispatch) => {
		try {
			axios.delete(`/note/${noteId}/${userId}`)
			.then((response) => dispatch({
				type: DELETE_NOTE,
				notes: response.data
			}));
		} catch (err) {
			console.log(err);
		}
	};
};

export const addNoteTag = (noteId, tagId) => {
	return (dispatch) => {
		try {
			noteId && tagId 
			? axios.post(`/tag/${noteId}/${tagId}`) 
			.then((response) => {dispatch({
				type: ADD_NOTE_TAG,
				note: response.data
			})
			console.log('res', response.data)}
			)
			: console.log('No se ha proporcionado la información necesaria')
		} catch (err) {
			console.log(err); 
		}
	};
};

export const deleteNoteTag = (noteId, tagId) => {
	return (dispatch) => {
		try {
			noteId && tagId 
			? axios.delete(`/tag/${noteId}/${tagId}`)
			.then((response) => {dispatch({
				type: DELETE_NOTE_TAG,
				note: response.data
			})
			console.log('res', response.data)}
			)
			: console.log('No se ha proporcionado la información necesaria')
			
		} catch (err) {
			console.log(err);
		}
	};
};
