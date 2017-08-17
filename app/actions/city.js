import * as Types from '../constants/city';
import _ from '../util';
const GET_CITY_LIST = { type: Types.GET_CITY_LIST };

const getCityList = (cityName) => (dispatch) => {
    _.get('uniontrain/trainapi/GetCityStationList', { para: { 'headtime': 1502952442756, 
        'memberId': '', 
        'platId': 432, 
        'requestType': 3, 
        'headct': 0, 
        'headus': 3, 
        'headver': '2.14.0.2', 
        cityName } })
        .then(({ data }) => {
            const { TrainStation = {} } = data.data || {};
            const { StationList = [] } = TrainStation;

            dispatch({ ...GET_CITY_LIST, 
                cityList: StationList });
        });
};

export default {
    getCityList
};
