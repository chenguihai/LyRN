import * as Types from '../constants/city';
import _ from '../util';

const GET_HOT_CITY = { type: Types.GET_HOT_CITY };
const GET_CITY_LIST = { type: Types.GET_CITY_LIST };

// 选择城市
const SELECT_CITY = { type: Types.SELECT_CITY };

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

    // Storage.remove({ key: 'trainhotcities' });
    const localData = await Storage.load({
        key: 'trainhotcities',
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        syncInBackground: true
    });

    const { list = [] } = localData;

    dispatch({
        ...GET_HOT_CITY,
        hotcities: list
    });

};

const selectCity = (key, data) => (dispatch) => {
    dispatch({
        ...SELECT_CITY,
        obj: { [key]: data }
    });
};

export default {
    getCityList,
    getHotCities,
    selectCity
};
