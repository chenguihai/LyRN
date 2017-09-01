import { GET_HOT_CITY, GET_CITY_LIST } from '../constants/city';

const initialState = {
    hotcities: [], // 热门城市
    cityList: []
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
        default:
            nextState = { ...state };
    }

    return nextState || state;
}
