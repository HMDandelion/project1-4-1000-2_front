import {createActions, handleActions} from "redux-actions";

const initialState = {
    /* 초기화 */
};

/* 액션 타입 */
const GET_PLANNING_ORDER = 'planningOrder/GET_PLANNING_ORDER';
const SUCCESS = 'planningOrder/SUCCESS';
const DELETED = 'planningOrder/DELETED';

/* 액션 함수 */
export const { planningOrder : { getPlanningOrder, success, deleted } } = createActions({
    [GET_PLANNING_ORDER] : (result) => ({ planningOrder : result.data }),
    [SUCCESS] : () => ({ success : true }),
    [DELETED] : () => ({ deleted : true})
});

/* 리듀서 함수 */
const planningOrderReducer = handleActions({
    [GET_PLANNING_ORDER] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
},initialState);

export default planningOrderReducer;