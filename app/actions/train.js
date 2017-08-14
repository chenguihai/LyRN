import * as Types from '../constants/train';
import _ from '../util';
const GET_BANNER = { type: Types.GET_TRAIN_BANNER };
const GET_NOTICE = { type: Types.GET_TRAIN_NOTICE };
const GET_TAB = { type: Types.GET_TAB };

const getBanner = () => (dispatch) => {
    _.get('home/Commercial.ashx')
        .then(({ data }) => {
            dispatch(
                { ...GET_BANNER,
                    data1: data || {} }
            );
        });
};

const getNotice = () => (dispatch) => {
    _.get('home/notice.ashx?cardId=&cardCode=&openId=&projectId=10&type=')
        .then(({ data }) => {
            dispatch({ 
                ...GET_NOTICE, 
                notice: data.Notice || {} }
            );
        });
};

const getTab = () => (dispatch) => {
    _.get('home/tabicon.ashx')
        .then(({ data }) => {
            dispatch(
                { ...GET_TAB,
                    data2: data || {} }
            );
        });
};

export default {
    getBanner,
    getNotice,
    getTab
};

