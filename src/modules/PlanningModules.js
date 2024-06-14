import {createActions, handleActions} from "redux-actions";

const initialState = {
    /* 초기화 */
};

/* 액션 타입 */
const GET_PLANNINGS = 'planning/GET_PLANNINGS';
const GET_PLANNING = 'planning/GET_PLANNING';
const SUCCESS = 'planning/SUCCESS';
const DELETED = 'planning/DELETED';

/* 액션 함수 */
export const { planning : { getPlannings, getPlanning, success, deleted } } = createActions({
    [GET_PLANNINGS] : (result) => ({ plannings : result.data }),
    [GET_PLANNING] : (result) => ({ planning : result.data }),
    [SUCCESS] : () => ({ success : true }),
    [DELETED] : () => ({ deleted : true})
});

/* 리듀서 함수 */
const planningReducer = handleActions({
    [GET_PLANNINGS] : (state, {payload}) => payload,
    [GET_PLANNING] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
},initialState);

export default planningReducer;