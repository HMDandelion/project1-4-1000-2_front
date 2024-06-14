/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_RETURNS = 'return/GET_RETURNS';
const GET_RETURN = 'return/GET_RETURN';
const SUCCESS = 'return/SUCCESS';
const CANCELED = 'return/CANCELED';

export const { return : {getReturns, getReturn, success, canceled}} = createActions({
    [GET_RETURNS] : result => ({returns : result.data}),
    [GET_RETURN] : result => ({returnData : result.data}),
    [SUCCESS] : () => ({returnSuccess : true}),
    [CANCELED] : () => ({canceled : true})
});

/* 리듀서 */
const returnReducer = handleActions({
    [GET_RETURNS] : (state, {payload}) => payload,
    [GET_RETURN] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [CANCELED] : (state, {payload}) => payload
}, initialState);

export default returnReducer;