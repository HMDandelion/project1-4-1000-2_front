/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
};

/* 액션 */
const GET_RELEASE_ORDERS = 'release/GET_RELEASE_ORDERS';
const GET_RELEASE_ORDERS_PAGE = 'release/GET_RELEASE_ORDERS_PAGE';
const GET_ORDER_PRODUCTS = 'release/GET_ORDER_PRODUCTS';
const GET_RELEASE_EXPECTED = 'release/GET_RELEASE_EXPECTED';
const GET_RELEASE_LACK = 'release/GET_RELEASE_LACK';


export const { release : {getReleaseOrders,getReleaseOrdersPage,getOrderProducts,getReleaseExpected,getReleaseLack}} = createActions({
    [GET_RELEASE_ORDERS] : result => ({ orders : result.data }),
    [GET_RELEASE_ORDERS_PAGE] : result => ({ ordersPage : result.data }),
    [GET_ORDER_PRODUCTS] : result => ({ orderProducts : result.data }),
    [GET_RELEASE_EXPECTED] : result => ({ releaseExpected : result.data }),
    [GET_RELEASE_LACK] : result => ({ releaseLack : result.data })
});

/* 리듀서 */
const releaseReducer = handleActions({
    [GET_RELEASE_ORDERS]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_RELEASE_ORDERS_PAGE]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_ORDER_PRODUCTS]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_RELEASE_EXPECTED]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_RELEASE_LACK]: (state, { payload }) => ({
        ...state,
        ...payload
    })
}, initialState);

export default releaseReducer;