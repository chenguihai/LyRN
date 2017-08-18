import * as Types from '../constants/date';

const SELECT_DATE = { type: Types.SELECT_DATE };

const selectDate = (time) => (dispatch) => {
    dispatch({ ...SELECT_DATE, 
        tripTime: time });
};

export default {
    selectDate
};

