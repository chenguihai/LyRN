import { GET_FLIGHT_BANNER, GET_FLIGHT_NOTICE } from '../constants/flight';
const initialState = {
    data: {},
    notice: {}
};

export default function flight(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_FLIGHT_BANNER:
        nextState = {
            ...state,
            data: action.data
        };
        break;
    case GET_FLIGHT_NOTICE:
        nextState = {
            ...state,
            notice: action.notice
        };
        break;
    default:
        nextState = { ...state };
    }

    return nextState || state;
}
