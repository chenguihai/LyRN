import { SELECT_DATE } from '../constants/date';

function resetTime(dateObj) {
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    
    return Number(dateObj);
}

const initialState = {
    tripTime: resetTime(new Date()) + 8.64e7,
    tripTimeDes: '明日出发'
};

export default function date(state = initialState, actions) {
    let nextState;

    switch (actions.type) {
    case SELECT_DATE:
        nextState = { ...state };
        break;
    default:
        nextState = { ...state };
    }
    
    return nextState;
}
