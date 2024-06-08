import { createActions, handleActions } from "redux-actions";

const initialState = {
    // products: [],
    // success: false,
    // productList: []
};

const GET_INVENTORY_PRODUCTS = 'product/GET_INVENTORY_PRODUCTS';
const SUCCESS = 'product/SUCCESS';
const GET_INVENTORY_PRODUCT_LIST = 'product/GET_INVENTORY_PRODUCT_LIST';

export const { product: { getInventoryProducts, success, getInventoryProductList } } = createActions({
    [GET_INVENTORY_PRODUCTS]: result => ({ products: result }),
    [SUCCESS]: () => ({ success: true }),
    [GET_INVENTORY_PRODUCT_LIST]: result => ({ productList: result })
});

const productReducer = handleActions({
    [GET_INVENTORY_PRODUCTS]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        products: payload.products // products 속성 업데이트
    }),
    [SUCCESS]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        success: payload.success // success 속성 업데이트
    }),
    [GET_INVENTORY_PRODUCT_LIST]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        productList: payload.productList // productList 속성 업데이트
    })
}, initialState);

export default productReducer;
