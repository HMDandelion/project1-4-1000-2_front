/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
    // products: [],
    // stocks: [],
    // total: 0,
    // productTotal: 0,
};

/* 액션 */
const GET_INVENTORY_STOCKS = 'product/GET_INVENTORY_STOCKS';
const TOTAL = 'product/TOTAL';
const PRODUCT_TOTAL = 'product/PRODUCT_TOTAL';

export const { product: {getInventoryStocks, total, productTotal}} = createActions({
    [GET_INVENTORY_STOCKS]: result => ({stocks: result}),
    [TOTAL]: result => ({total: result}),
    [PRODUCT_TOTAL]: result => ({productTotal: result})
});

/* 리듀서 */
const stockReducer = handleActions({
    [GET_INVENTORY_STOCKS]: (state, {payload}) => ({...state, stocks: payload.stocks}),
    [TOTAL]: (state, {payload}) => ({...state, total: payload.total}),
    [PRODUCT_TOTAL]: (state, {payload}) => ({...state, productTotal: payload.productTotal})
}, initialState);

export default stockReducer;
