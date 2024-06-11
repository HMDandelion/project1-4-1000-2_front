import { createActions, handleActions } from "redux-actions";

const initialState = {

};

const GET_INVENTORY_PRODUCTS = 'product/GET_INVENTORY_PRODUCTS';
const SUCCESS = 'product/SUCCESS';
const GET_INVENTORY_PRODUCT_LIST = 'product/GET_INVENTORY_PRODUCT_LIST';
const GET_INVENTORY_PRODUCT = 'product/GET_INVENTORY_PRODUCT';
const GET_INVENTORY_PRODUCT_BOM = 'product/GET_INVENTORY_PRODUCT_BOM';
const GET_INVENTORY_MATERIALS = 'product/GET_INVENTORY_MATERIALS';
const GET_BOM_PAGING = 'product/GET_BOM_PAGING';
const GET_SPEC = 'product/GET_SPEC';
const GET_SPEC_PAGING = 'product/GET_SPEC_PAGING';
const GET_PRODUCT_CLIENT = 'product/GET_PRODUCT_CLIENT';
const GET_EMPLOYEES = 'product/GET_EMPLOYEES';

export const { product: { getInventoryProducts, success, getInventoryProductList,getInventoryProduct,getInventoryProductBom,getInventoryMaterials,getBomPaging,getSpec,getSpecPaging,getProductClient,getEmployees} } = createActions({
    [GET_INVENTORY_PRODUCTS]: result => ({ products: result }),
    [SUCCESS]: () => ({ success: true }),
    [GET_INVENTORY_PRODUCT_LIST]: result => ({ productList: result }),
    [GET_INVENTORY_PRODUCT]: result => ({ product: result }),
    [GET_INVENTORY_PRODUCT_BOM]: result => ({ bom: result }),
    [GET_INVENTORY_MATERIALS]: result => ({ materials: result }),
    [GET_BOM_PAGING]: result => ({ bomPaging: result }),
    [GET_SPEC]: result => ({spec:result}),
    [GET_SPEC_PAGING]: result => ({specPaging:result}),
    [GET_PRODUCT_CLIENT]: result => ({productClient:result}),
    [GET_EMPLOYEES] : result => ({employees:result})
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
    }),
    [GET_BOM_PAGING]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        bomPaging: payload.bomPaging
    }),
    [GET_SPEC]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        spec: payload.spec
    }),
    [GET_SPEC_PAGING]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        specPaging: payload.specPaging
    }),
    [GET_PRODUCT_CLIENT]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        productClient: payload.productClient
    }),
    [GET_EMPLOYEES]: (state, { payload }) => ({
        ...state, // 현재 state 복사
        employees: payload.employees
    })
}, initialState);

export default productReducer;
