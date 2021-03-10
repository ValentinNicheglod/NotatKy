import {
    ADD_NOTE_TAG,
    GET_ALL_TAGS,
    GET_ONE_TAG,
    CREATE_TAG,
    UPDATE_TAG,
    DELETE_NOTE_TAG,
    DELETE_TAG
} from '../Constants/Index';

const initialState = {
    tag: {},
    tags: [],
    message: ''
};

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE_TAG:
          return {
            ...state,
            tag: action.tag
          };
          case GET_ALL_TAGS:
          return {
            ...state,
            tags: action.tags
          };
          case CREATE_TAG:
          return {
            ...state,
            tag: action.tag
          };
          case UPDATE_TAG:
          return {
            ...state,
            tag: action.tag
          };
          case DELETE_TAG:
          return {
            ...state,
            message: action.message
          };

        default: return state;
    }
}