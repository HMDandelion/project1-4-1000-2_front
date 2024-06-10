/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_ORDERS = 'orders/GET_MATERIAL_ORDERS';
const GET_MATERIAL_ORDER = 'order/GET_MATERIAL_ORDER';
const SUCCESS = 'order/SUCCESS';
const DELETED = 'order/DELETED';

export const { orders : {getMaterialOrders, getMaterialOrder, success, deleted}} = createActions({
    [GET_MATERIAL_ORDERS] : result => ({ orders : result.data }),
    [GET_MATERIAL_ORDER] : result => ({ order : result.data }),
    [SUCCESS] : () => ({success : true}),
    [DELETED] : () => ({deleted : true})
});

/* 리듀서 */
const materialOrderReducer = handleActions({
    [GET_MATERIAL_ORDERS] : (state, {payload}) => payload,
    [GET_MATERIAL_ORDER] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default materialOrderReducer;