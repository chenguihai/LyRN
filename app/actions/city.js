import * as Types from '../constants/city';
import _ from '../util';

const GET_HOT_CITY = { type: Types.GET_HOT_CITY };
const GET_CITY_LIST = { type: Types.GET_CITY_LIST };

const getCityList = (cityName) => async (dispatch) => {
    const uri = 'uniontrain/trainapi/GetCityStationList';

    const { data } = await _.get(uri, {
        para: {
            'headtime': Number(new Date()),
            'memberId': '',
            'platId': 432,
            'requestType': 3,
            'headct': 0,
            'headus': 3,
            'headver': '2.14.0.2',
            cityName
        }
    });

    const
        { data: res = {} } = data,
        { TrainStation = {} } = res,
        { StationList = [] } = TrainStation;

    dispatch({
        ...GET_CITY_LIST,
        cityList: StationList
    });
};

const getHotCities = () => async (dispatch) => {

    const uri = 'huochepiao/resource/station/GetHotCityListV1';

    const response = await _.get(uri, {
        para: {
            length: 15,
            callback: '_jsonp6p6ua4ts5m5poth30m6rms4i'
        }
    });

    const
        { data = {} } = response || {},
        { TrainStation = {} } = data,
        { StationList = [] } = TrainStation;

    dispatch({
        ...GET_HOT_CITY,
        hotcities: StationList
    });

};

export default {
    getCityList,
    getHotCities
};
