/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_SALES_CLIENTS = 'client/GET_SALES_CLIENTS';

export const { client : {getSalesClients}} = createActions({
    [GET_SALES_CLIENTS] : result => ({ clients : result.data })
});

/* 리듀서 */
const clientReducer = handleActions({
    [GET_SALES_CLIENTS] : (state, {payload}) => payload
}, initialState);

export default clientReducer;