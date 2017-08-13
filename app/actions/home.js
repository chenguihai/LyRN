import * as Types from '../constants/home';
import _ from '../util';
const GET_BANNER = { type: Types.GET_BANNER };
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
    getTab
};

