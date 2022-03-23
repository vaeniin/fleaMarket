import {
    CHATS_RECEIVED,
    MESSAGE_SUCCESS, 
    USER_UPDATED,
    MESSAGES_RECEIVED,
    LOGOUT,
} from '../constants/userActionTypes';

const initialState = {
    chats: [],
    messages: [],
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT:
            return {
                ...initialState,
            };
        case USER_UPDATED:
            return {
                ...state,
                ...action.payload,
            };
        case CHATS_RECEIVED:
            return {
                ...state,
                chats: action.payload,
            };
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: action.payload,
            };
        case MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [action.payload, ...state.messages],
            };
        default:
            return state;
    }
};

export default userReducer;