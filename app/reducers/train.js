import { GET_TRAIN_BANNER, GET_TRAIN_NOTICE, GET_TAB } from '../constants/train';
const initialState = {
    data1: {},
    notice: {},
    data2: {}
};

export default function train(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_TRAIN_BANNER:
        nextState = { ...state, 
            data1: action.data1 };
        break;
    case GET_TRAIN_NOTICE:
        nextState = { ...state, 
            notice: action.notice };
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
