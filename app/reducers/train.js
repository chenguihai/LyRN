import { GET_TRAIN_BANNER, GET_TRAIN_NOTICE, GET_TAB, GET_TRAIN_LIST, CHANGE_TRAIN_LIST_LENGTH } from '../constants/train';

const initialState = {
    data1: {},
    notice: {},
    data2: {},
    trainList: { data: {} },
    length: 6
};

export default function train(state = initialState, action) {
    let nextState;

    switch (action.type) {
    case GET_TRAIN_BANNER:
        nextState = {
            ...state,
            data1: action.data1
        };
        break;
    case GET_TRAIN_NOTICE:
        nextState = {
            ...state,
            notice: action.notice
        };
        break;
    case GET_TAB:
        nextState = {
            ...state,
            data2: action.data2
        };
        break;
    case GET_TRAIN_LIST:
        nextState = {
            ...state,
            trainList: action.trainList,
            length: action.length
        };
        break;
    case CHANGE_TRAIN_LIST_LENGTH:
        nextState = {
            ...state,
            length: action.length
        };
        break;
    default:
        nextState = { ...state };
    }

    return nextState || state;
}
