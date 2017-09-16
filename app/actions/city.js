import * as Types from '../constants/city';

const GET_HISTORY_CITY = { type: Types.GET_HISTORY_CITY };

// 选择城市
const SELECT_CITY = { type: Types.SELECT_CITY };

const getHistoryCities = () => async (dispatch) => {
    try {
        const data = await Storage.getAllDataForKey('trainhistorycities');

        console.log(data);
        dispatch({
            ...GET_HISTORY_CITY,
            historycities: data
        });
    } catch (err) {
        console.log(err);
    }

};

const selectCity = (data) => (dispatch) => {
    dispatch({
        ...SELECT_CITY,
        obj: data
    });
};


export default {
    getHistoryCities,
    selectCity,
};
