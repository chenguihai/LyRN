import { combineReducers } from 'redux';
import Train from './train';
import Flight from './flight';
import Bus from './bus';

const AppReducer = combineReducers({
    Train,
    Flight,
    Bus
});

export default AppReducer;
