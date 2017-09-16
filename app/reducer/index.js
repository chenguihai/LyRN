import { combineReducers } from 'redux';
import Train from './train';
import Flight from './flight';
import Bus from './bus';
import City from './city';
import Date from './date';

const AppReducer = combineReducers({
    Train,
    Flight,
    Bus,
    City,
    Date
});

export default AppReducer;
