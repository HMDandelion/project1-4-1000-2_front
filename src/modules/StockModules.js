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
const GET_TODAY_STOCK = 'product/GET_TODAY_STOCK';
const GET_STOCK_WAREHOUSE = 'product/GET_STOCK_WAREHOUSE';

export const { product: {getInventoryStocks, total, productTotal,getTodayStock,getStockWarehouse}} = createActions({
    [GET_INVENTORY_STOCKS]: result => ({stocks: result}),
    [TOTAL]: result => ({total: result}),
    [PRODUCT_TOTAL]: result => ({productTotal: result}),
    [GET_TODAY_STOCK]:result => ({todayStock:result}),
    [GET_STOCK_WAREHOUSE]:result => ({stockWarehouse:result})
});

/* 리듀서 */
const stockReducer = handleActions({
    [GET_INVENTORY_STOCKS]: (state, {payload}) => ({...state, stocks: payload.stocks}),
    [TOTAL]: (state, {payload}) => ({...state, total: payload.total}),
    [PRODUCT_TOTAL]: (state, {payload}) => ({...state, productTotal: payload.productTotal}),
    [GET_TODAY_STOCK]: (state, {payload}) => ({...state, todayStock: payload.todayStock}),
    [GET_STOCK_WAREHOUSE]: (state, {payload}) => ({...state, stockWarehouse: payload.stockWarehouse})
}, initialState);

export default stockReducer;
