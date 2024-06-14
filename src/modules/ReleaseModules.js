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
const GET_RELEASES = 'release/GET_RELEASES';
const GET_RELEASES_PAGE = 'release/GET_RELEASES_PAGE';
const GET_ORDER_INFORMATIONS = 'release/GET_ORDER_INFORMATIONS';
const GET_SHIPPINGS = 'release/GET_SHIPPINGS';
const GET_COMPLETES = 'release/GET_COMPLETES';


export const { release : {getReleaseOrders,getReleaseOrdersPage,getOrderProducts,getReleaseExpected,getReleaseLack,getReleases,getReleasesPage,getOrderInformations,getShippings,getCompletes}} = createActions({
    [GET_RELEASE_ORDERS] : result => ({ orders : result.data }),
    [GET_RELEASE_ORDERS_PAGE] : result => ({ ordersPage : result.data }),
    [GET_ORDER_PRODUCTS] : result => ({ orderProducts : result.data }),
    [GET_RELEASE_EXPECTED] : result => ({ releaseExpected : result.data }),
    [GET_RELEASE_LACK] : result => ({ releaseLack : result.data }),
    [GET_RELEASES] : result => ({ releases : result.data }),
    [GET_RELEASES_PAGE] : result => ({ releasesPage : result.data }),
    [GET_ORDER_INFORMATIONS] : result => ({orderInformations:result.data}),
    [GET_SHIPPINGS] : result => ({shippings:result.data}),
    [GET_COMPLETES] : result => ({completes:result.data}),
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
    }),
    [GET_RELEASES]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_RELEASES_PAGE]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_ORDER_INFORMATIONS]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_SHIPPINGS]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_COMPLETES]: (state, { payload }) => ({
        ...state,
        ...payload
    })
}, initialState);

export default releaseReducer;