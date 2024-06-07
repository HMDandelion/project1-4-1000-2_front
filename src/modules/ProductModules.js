/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_PRODUCTS = 'product/GET_INVENTORY_PRODUCTS';
const SUCCESS = 'product/SUCCESS';

export const { product : {getInventoryProducts, success}} = createActions({
    [GET_INVENTORY_PRODUCTS] : result => ({ products : result }),
    [SUCCESS] : () => ({success : true})
});

/* 리듀서 */
const productReducer = handleActions({
    [GET_INVENTORY_PRODUCTS] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload
}, initialState);

export default productReducer;