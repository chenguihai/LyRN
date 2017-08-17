import { GET_CITY_LIST } from '../constants/city';
const initialState = {
    cityList: []
};

export default function city(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_CITY_LIST:
        nextState = { ...state, 
            cityList: action.cityList };
        break;
    default:
        nextState = { ...state };
    }
    
    return nextState || state;
}
