import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { selectCity, selectDate } from '../actions';
import date from '../util/date';

const City = handleAction(
    selectCity, 
    (state, { payload }) => Object.assign({}, state, { ...payload }), 
    { 
        trainFromCity: { Name: '上海' }, 
        trainToCity: { Name: '北京' } 
    }
);

const Date = handleAction(
    selectDate, 
    (state, { payload }) => Object.assign({}, state, { ...payload }), 
    { 
        trainTripTime: date.getTomorrow(), 
        trainTripTimeDesc: '明日出发' 
    }
);

const AppReducer = combineReducers({
    City, 
    Date
});

export default AppReducer;
