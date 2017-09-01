import * as Types from '../constants/date';
import _ from '../util';

const SELECT_DATE = { type: Types.SELECT_DATE };

const dayMap = {
    [_.getToday()]: '今天',
    [_.getTomorrow()]: '明天',
    [_.getAfterTomorrow()]: '后天'
};
const weekMap = ['日', '一', '二', '三', '四', '五', '六']; // eslint-disable-line

const selectDate = (routeName, time) => (dispatch) => {
    dispatch({
        ...SELECT_DATE,
        obj: {
            [`${routeName}tripTime`]: time,
            [`${routeName}tripTimeDes`]: dayMap[time] || `周${weekMap[new Date(time).getDay()]}出发`
        }
    });
};

export default {
    selectDate
};

