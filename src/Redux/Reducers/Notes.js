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

const initialState = {
    note: {},
    notes: [],
    message: ''
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_NOTE_STATE:
          return {
            ...state,
            notes: action.notes
          };
        case GET_ONE_NOTE:
          return {
            ...state,
            note: action.note
          };
        case GET_ALL_NOTES:
          return {
            ...state,
            notes: action.notes
          };
        case CREATE_NOTE:
          return {
            ...state,
            note: action.note
          };
          case UPDATE_NOTE:
          return {
            ...state,
            note: action.note
          };
          case DELETE_NOTE:
          return {
            ...state,
            notes: action.notes
          };
          case DELETE_NOTE_TAG:
            return {
              ...state,
              note: action.note,
            };
          case ADD_NOTE_TAG:
          return {
            ...state,
            note: action.note
          };
        default: return state;
    }
}