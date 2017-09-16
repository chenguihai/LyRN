import * as Types from '../constants/train';
import _ from '../util';

// const GET_BANNER = { type: Types.GET_TRAIN_BANNER };

const GET_TRAIN_LIST = { type: Types.GET_TRAIN_LIST };
const CHANGE_TRAIN_LIST_LENGTH = { type: Types.CHANGE_TRAIN_LIST_LENGTH };
const IS_SHOW_SELECT_SEATS_MODAL = { type: Types.IS_SHOW_SELECT_SEATS_MODAL };

// 获取火车时刻列表
const getTrainList = (fromCity, toCity, date) => (dispatch) => {
    const para = {
        'from': fromCity,
        'to': toCity,
        'oby': '0',
        date,
        'platId': 501,
        'requestType': 4,
        'headct': 1,
        'headus': 1,
        'headver': '2.14.0.2',
        'isstu': false,
        'headtime': new Date().getTime()
    };

    _.get('uniontrain/trainapi/searchno.html', { para })
        .then(({ data }) => {
            dispatch({
                ...GET_TRAIN_LIST,
                trainList: data,
                length: 6
            });
        });
};

const changeLength = () => (dispatch, getState) => {
    const originalLength = getState().Train.length;

    dispatch({
        ...CHANGE_TRAIN_LIST_LENGTH,
        length: originalLength + 20
    });
};

const isShowSeatsModal = (bool) => (dispatch) => {
    dispatch({
        ...IS_SHOW_SELECT_SEATS_MODAL,
        modalVisible: bool
    });
};

export default {
    getTrainList,
    changeLength,
    isShowSeatsModal
};

