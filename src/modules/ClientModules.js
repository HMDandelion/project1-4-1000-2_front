/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_SALES_CLIENTS = 'client/GET_SALES_CLIENTS';
const GET_SALES_CLIENT = 'client/GET_SALES_CLIENT';

export const { client : {getSalesClients, getSalesClient}} = createActions({
    [GET_SALES_CLIENTS] : result => ({ clients : result.data }),
    [GET_SALES_CLIENT] : result => ({ client : result.data })
});

/* 리듀서 */
const clientReducer = handleActions({
    [GET_SALES_CLIENTS] : (state, {payload}) => payload,
    [GET_SALES_CLIENT] : (state, {payload}) => payload
}, initialState);

export default clientReducer;