/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_SALES_CLIENTS = 'client/GET_SALES_CLIENTS';
const GET_SALES_CLIENT = 'client/GET_SALES_CLIENT';
const SUCCESS = 'client/SUCCESS';

export const { client : {getSalesClients, getSalesClient, success}} = createActions({
    [GET_SALES_CLIENTS] : result => ({ clients : result.data }),
    [GET_SALES_CLIENT] : result => ({ client : result.data }),
    [SUCCESS] : () => ({success : true})
});

/* 리듀서 */
const clientReducer = handleActions({
    [GET_SALES_CLIENTS] : (state, {payload}) => payload,
    [GET_SALES_CLIENT] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload
}, initialState);

export default clientReducer;