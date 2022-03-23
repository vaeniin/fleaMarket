import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemReducer from './itemReducer';
import generalReducer from './generalReducer';

const rootReducer = combineReducers({
    user: userReducer,
    item: itemReducer,
    general: generalReducer,
});

export default rootReducer;