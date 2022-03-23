import {
    FETCH_ERROR,
    LOADING,
    SET_FORM,
    FORM_ERROR,
    EMPTY_FORM,
    SET_PASSCODEMSG,
} from '../constants/generalActionTypes';

const initialState = {
    form: {},
    loading: false,
    dataError: '',
    formErrors: {},
    passcodeMsg: '',
    otp: '',
};

const generalReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case FETCH_ERROR:
            return {
                ...state,
                dataError: action.payload,
            };
        case FORM_ERROR:
            return {
                ...state,
                formErrors: action.payload,
            };
        case SET_FORM:
            return {
                ...state,
                form: action.payload,
            };
        case EMPTY_FORM:
            return {
                ...state,
                form: {},
                formErrors: {},
                passcodeMsg: '',
                otp: '',
            };
        case SET_PASSCODEMSG:
            return {
                ...state,
                passcodeMsg: action.payload.message,
                otp: action.payload.otp,
            };
        default:
            return state;
    }
};

export default generalReducer;