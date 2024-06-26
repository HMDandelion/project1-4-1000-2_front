/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_ORDERS = 'order/GET_ORDERS';
const GET_ORDER = 'order/GET_ORDER';
const SUCCESS = 'order/SUCCESS';
const CANCELED = 'order/CANCELED';

export const { order : {getOrders, getOrder, success, canceled}} = createActions({
    [GET_ORDERS] : result => ({orders : result.data}),
    [GET_ORDER] : result => ({order : result.data}),
    [SUCCESS] : () => ({orderSuccess : true}),
    [CANCELED] : () => ({canceled : true})
});

/* 리듀서 */
const orderReducer = handleActions({
    [GET_ORDERS] : (state, {payload}) => payload,
    [GET_ORDER] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [CANCELED] : (state, {payload}) => payload
}, initialState);

export default orderReducer;