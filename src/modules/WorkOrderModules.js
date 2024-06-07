import {createActions, handleActions} from "redux-actions";

const initialState = {
    /* 초기화 */
    success : false
};

/* 액션 타입 */
const GET_WORK_ORDERS = 'workOrders/GET_WORK_ORDERS';
const SUCCESS = 'workOrders/SUCCESS';

/* 액션 함수 */
export const { workOrders : { getWorkOrders, success } } = createActions({
    [GET_WORK_ORDERS] : (result) => ({ workOrders : result.data }),
    [SUCCESS] : () => ({ success : true })
});

/* 리듀서 함수 */
const WorkOrderReducer = handleActions({
    [GET_WORK_ORDERS] : (state, {payload}) => ({
        ...state,
        workOrders : payload.workOrders
    })
},initialState);

export default WorkOrderReducer;