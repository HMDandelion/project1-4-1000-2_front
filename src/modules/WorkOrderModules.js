import {createActions, handleActions} from "redux-actions";

const initialState = {
    /* 초기화 */
};

/* 액션 타입 */
const GET_WORK_ORDERS = 'workOrder/GET_WORK_ORDERS';
const GET_WORK_ORDER = 'workOrder/GET_WORK_ORDER';
const SUCCESS = 'workOrder/SUCCESS';
const DELETED = 'workOrder/DELETED';

/* 액션 함수 */
export const { workOrder : { getWorkOrders, getWorkOrder, success, deleted } } = createActions({
    [GET_WORK_ORDERS] : (result) => ({ workOrders : result.data }),
    [GET_WORK_ORDER] : (result) => ({ workOrder : result.data }),
    [SUCCESS] : () => ({ success : true }),
    [DELETED] : () => ({ deleted : true})
});

/* 리듀서 함수 */
const workOrderReducer = handleActions({
    [GET_WORK_ORDERS] : (state, {payload}) => payload,
    [GET_WORK_ORDER] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
},initialState);

export default workOrderReducer;