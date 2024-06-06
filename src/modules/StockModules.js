/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_STOCKS = 'product/GET_INVENTORY_STOCKS';

export const { product : {getInventoryStocks}} = createActions({
    [GET_INVENTORY_STOCKS] : result => ({ stocks : result })
});

/* 리듀서 */
const stockReducer = handleActions({
    [GET_INVENTORY_STOCKS] : (state, {payload}) => payload
}, initialState);

export default stockReducer;