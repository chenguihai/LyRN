import { GET_BUS_BANNER, GET_BUS_NOTICE } from '../constants/bus';
const initialState = {
    data: {},
    notice: {}
};

export default function flight(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_BUS_BANNER:
        nextState = { ...state, 
            data: action.data };
        break;
    case GET_BUS_NOTICE:
        nextState = { ...state, 
            notice: action.notice };
        break;
    default:
        nextState = { ...state };
    }
    
    return nextState || state;
}
