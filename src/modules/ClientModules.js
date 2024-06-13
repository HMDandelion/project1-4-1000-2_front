/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_SALES_CLIENTS = 'client/GET_SALES_CLIENTS';
const GET_SALES_CLIENT = 'client/GET_SALES_CLIENT';
const GET_SIMPLE_SALES_CLIENTS = 'client/GET_SIMPLE_SALES_CLIENTS'
const GET_MATERIAL_CLIENTS = 'client/GET_MATERIAL_CLIENTS';
const GET_MATERIAL_CLIENT = 'client/GET_MATERIAL_CLIENT';
const SUCCESS = 'client/SUCCESS';
const DELETED = 'client/DELETED';

export const { client : {getSalesClients, getSalesClient, getSimpleSalesClients, getMaterialClients, getMaterialClient, success, deleted}} = createActions({
    [GET_SALES_CLIENTS] : result => ({ clients : result.data }),
    [GET_SALES_CLIENT] : result => ({ client : result.data }),
    [GET_SIMPLE_SALES_CLIENTS] : result => ({ simpleClients : result.data }),
    [GET_MATERIAL_CLIENTS] : result => ({ clients : result.data }),
    [GET_MATERIAL_CLIENT] : result => ({ client : result.data }),
    [SUCCESS] : () => ({success : true}),
    [DELETED] : () => ({deleted : true})
});

/* 리듀서 */
const clientReducer = handleActions({
    [GET_SALES_CLIENTS] : (state, {payload}) => payload,
    [GET_SALES_CLIENT] : (state, {payload}) => payload,
    [GET_SIMPLE_SALES_CLIENTS] : (state, {payload}) => payload,
    [GET_MATERIAL_CLIENTS] : (state, {payload}) => payload,
    [GET_MATERIAL_CLIENT] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default clientReducer;