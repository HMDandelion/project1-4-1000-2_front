/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_STOCKS = 'stocks/GET_MATERIAL_STOCKS';
const GET_MATERIAL_STOCK = 'stocks/GET_MATERIAL_STOCK';
const SUCCESS = 'stock/SUCCESS';
const DELETED = 'stock/DELETED';

export const { stocks : {getMaterialStocks, getMaterialStock,getMaterialDrop, success, deleted}} = createActions({
    [GET_MATERIAL_STOCKS] : result => ({ stocks : result.data }),
    [GET_MATERIAL_STOCK] : result => ({ stock : result.data }),
    [SUCCESS] : () => ({success : true}),
    [DELETED] : () => ({deleted : true})
});

/* 리듀서 */
const materialStockReducer = handleActions({
    [GET_MATERIAL_STOCKS] : (state, {payload}) => payload,
    [GET_MATERIAL_STOCK] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default materialStockReducer;