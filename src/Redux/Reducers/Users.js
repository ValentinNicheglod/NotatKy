import {
    DARK_MODE,
    GET_ALL_USERS,
    GET_ONE_USER,
    CREATE_USER,
    UPDATE_USER
} from '../Constants/Index';

const initialState = {
    darkMode: false,
    user: {},
    users: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case DARK_MODE:
          return {
            ...state,
            darkMode: action.darkMode
          };
        case GET_ONE_USER:
          return {
            ...state,
            user: action.user
          };
          case GET_ALL_USERS:
          return {
            ...state,
            users: action.users
          };
          case CREATE_USER:
          return {
            ...state,
            user: action.user
          };
          case UPDATE_USER:
          return {
            ...state,
            user: action.user
          };
        default: return state;
    }
}