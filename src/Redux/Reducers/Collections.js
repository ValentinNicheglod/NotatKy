import {
    GET_ALL_COLLECTIONS,
    GET_ONE_COLLECTION,
    CREATE_COLLECTION,
    UPDATE_COLLECTION,
    DELETE_COLLECTION
} from '../Constants/Index';

const initialState = {
    collection: {},
    collections: [],
    message: ''
};

export const collectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE_COLLECTION:
          return {
            ...state,
            collection: action.collection
          };
          case GET_ALL_COLLECTIONS:
          return {
            ...state,
            collections: action.collections
          };
          case CREATE_COLLECTION:
          return {
            ...state,
            collection: action.collection
          };
          case UPDATE_COLLECTION:
          return {
            ...state,
            collection: action.collection
          };
          case DELETE_COLLECTION:
          return {
            ...state,
            message: action.message
          };
        default: return state;
    }
}