import { combineReducers } from 'redux';
import Train from './train';
import Flight from './flight';
import Bus from './bus';
import City from './city';

const AppReducer = combineReducers({
    Train,
    Flight,
    Bus,
    City
});

export default AppReducer;
