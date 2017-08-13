import { GET_BANNER, GET_TAB } from '../constants/home';
const initialState = {
    data1: {},
    data2: {}
};

export default function home(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_BANNER:
        nextState = { ...state, 
            data1: action.data1 };
        break;
    case GET_TAB:
        nextState = { ...state, 
            data2: action.data2 };
        break;
    default:
        nextState = { ...state };
    }
    
    return nextState || state;
}
