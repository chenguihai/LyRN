import * as Types from '../constants/bus';
import _ from '../util';
const GET_BANNER = { type: Types.GET_BUS_BANNER };
const GET_NOTICE = { type: Types.GET_BUS_NOTICE };

const getBanner = () => (dispatch) => {
    _.get('home/Commercial.ashx', { projectId: 30 })
        .then(({ data }) => {
            dispatch(
                { ...GET_BANNER,
                    data: data || {} }
            );
        });
};

const getNotice = () => (dispatch) => {
    _.get('home/notice.ashx?cardId=&cardCode=&openId=&projectId=30&type=')
        .then(({ data }) => {
            dispatch({ 
                ...GET_NOTICE, 
                notice: data.Notice || {} }
            );
        });
};

export default {
    getBanner,
    getNotice
};

