import * as Types from '../constants/home';
import _ from '../util';
const GET_BANNER = { type: Types.GET_BANNER };

const getBanner = () => (dispatch) => {
    _.get('home/Commercial.ashx')
        .then(({ data }) => {
            dispatch(
                { ...GET_BANNER,
                    data1: data || {} }
            );
        });
};

export default {
    getBanner
};

