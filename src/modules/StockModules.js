/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_STOCKS = 'product/GET_INVENTORY_STOCKS';
const TOTAL = 'product/TOTAL';

export const { product : {getInventoryStocks,total}} = createActions({
    [GET_INVENTORY_STOCKS] : result => ({ stocks : result }),
    [TOTAL] : result => ({total : result})
});

/* 리듀서 */
const stockReducer = handleActions({
    [GET_INVENTORY_STOCKS] : (state, {payload}) => payload,
    [TOTAL] : (state, {payload}) => payload
}, initialState);

export default stockReducer;