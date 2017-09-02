import { GET_HISTORY_CITY, GET_HOT_CITY, GET_CITY_LIST, SELECT_CITY } from '../constants/city';

const initialState = {
    historycities: [], // 历史选择
    hotcities: [], // 热门城市
    cityList: [],
    TrainfromCity: { Name: '上海' },
    TraintoCity: { Name: '北京' },
    FlightfromCity: { Name: '上海' },
    FlighttoCity: { Name: '北京' },
    BusfromCity: { Name: '上海' },
    BustoCity: { Name: '北京' }
};

/**
 * hotcities: []
 * {
 *     Name: '北京',
 *     QPY: 'beijing',
 *     JPY: 'bj',
 *     Id: null,
 *     Name: null
 * }
 */

export default function city(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_HISTORY_CITY:
        nextState = {
            ...state,
            historycities: action.historycities
        };
        break;
    case GET_HOT_CITY:
        nextState = {
            ...state,
            hotcities: action.hotcities
        };
        break;
    case GET_CITY_LIST:
        nextState = {
            ...state,
            cityList: action.cityList
        };
        break;
    case SELECT_CITY:
        nextState = {
            ...state,
            ...action.obj
        };
        break;
    default:
        nextState = { ...state };
    }

    return nextState || state;
}
