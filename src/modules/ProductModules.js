/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_PRODUCTS = 'product/GET_INVENTORY_PRODUCTS';
const GET_INVENTORY_PRODUCT = 'product/GET_INVENTORY_PRODUCT';

export const { product : {getInventoryProducts, getInventoryProduct}} = createActions({
    [GET_INVENTORY_PRODUCTS] : result => ({ products : result }),
    [GET_INVENTORY_PRODUCT] : result => ({ product : result.data })
});

/* 리듀서 */
const productReducer = handleActions({
    [GET_INVENTORY_PRODUCTS] : (state, {payload}) => payload,
    [GET_INVENTORY_PRODUCT] : (state, {payload}) => payload
}, initialState);

export default productReducer;