import { SELECT_DATE } from '../constants/date';
import _ from '../util';

const initialState = {
    TraintripTime: _.resetTime(new Date()) + 8.64e7,
    TraintripTimeDes: '明日出发',
    FlighttripTime: _.resetTime(new Date()) + 8.64e7,
    FlighttripTimeDes: '明日出发',
    BustripTime: _.resetTime(new Date()) + 8.64e7,
    BustripTimeDes: '明日出发'
};

export default function date(state = initialState, actions) {
    let nextState;

    switch (actions.type) {
    case SELECT_DATE:
        nextState = {
            ...state,
            ...actions.obj
        };
        break;
    default:
        nextState = { ...state };
    }

    return nextState;
}
