import { SELECT_DATE } from '../constants/date';
import _ from '../util';

const initialState = {
    tripTime: _.resetTime(new Date()) + 8.64e7,
    tripTimeDes: '明日出发'
};

const dayMap = {
    [_.getToday()]: '今天',
    [_.getTomorrow()]: '明天',
    [_.getAfterTomorrow()]: '后天'
};

const weekMap = ['日', '一', '二', '三', '四', '五', '六']; // eslint-disable-line

export default function date(state = initialState, actions) {
    let nextState;

    switch (actions.type) {
        case SELECT_DATE:
            const { tripTime } = actions;
            nextState = {
                ...state,
                tripTime: tripTime,
                tripTimeDes: dayMap[tripTime] || `周${weekMap[new Date(tripTime).getDay()]}出发`
            };
            break;
        default:
            nextState = { ...state };
    }

    return nextState;
}
