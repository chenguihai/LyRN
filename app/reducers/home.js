import { GET_BANNER } from '../constants/home';
const initialState = {
    data1: {}
};

export default function home(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_BANNER:
        nextState = { ...state, 
            data1: action.data1 };
        break;
    default:
        nextState = { ...state };
    }
    
    return nextState || state;
}
