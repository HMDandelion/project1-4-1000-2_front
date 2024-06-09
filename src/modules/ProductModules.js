import { createActions, handleActions } from "redux-actions";

const initialState = {

};

const GET_INVENTORY_PRODUCTS = 'product/GET_INVENTORY_PRODUCTS';
const SUCCESS = 'product/SUCCESS';
const GET_INVENTORY_PRODUCT_LIST = 'product/GET_INVENTORY_PRODUCT_LIST';
const GET_INVENTORY_PRODUCT = 'product/GET_INVENTORY_PRODUCT';
const GET_INVENTORY_PRODUCT_BOM = 'product/GET_INVENTORY_PRODUCT_BOM';
const GET_INVENTORY_MATERIALS = 'product/GET_INVENTORY_MATERIALS';

export const { product: { getInventoryProducts, success, getInventoryProductList,getInventoryProduct,getInventoryProductBom,getInventoryMaterials} } = createActions({
    [GET_INVENTORY_PRODUCTS]: result => ({ products: result }),
    [SUCCESS]: () => ({ success: true }),
    [GET_INVENTORY_PRODUCT_LIST]: result => ({ productList: result }),
    [GET_INVENTORY_PRODUCT]: result => ({ product: result }),
    [GET_INVENTORY_PRODUCT_BOM]: result => ({ bom: result }),
    [GET_INVENTORY_MATERIALS]: result => ({ materials: result })
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
    }),
    [GET_INVENTORY_PRODUCT]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        product: payload.product
    }),
    [GET_INVENTORY_PRODUCT_BOM]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        bom: payload.bom
    }),
    [GET_INVENTORY_MATERIALS]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        materials: payload.materials
    })
}, initialState);

export default productReducer;
