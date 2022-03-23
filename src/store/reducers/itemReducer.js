import {
    ITEMS_RECEIVED,
    DETAILS_RECEIVED,
} from '../constants/itemActionTypes';

const initialState = {
    items: [],
    details: {},
};

const itemReducer = (state = initialState, action) => {
    switch(action.type) {
        case ITEMS_RECEIVED:
            return {
                ...state,
                items: action.payload,
            };
        case DETAILS_RECEIVED:
            return {
                ...state,
                details: action.payload,
            };
        default:
            return state;
    }
};

export default itemReducer;