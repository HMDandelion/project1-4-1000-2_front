import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_EMPLOYEE_INFO = 'auth/GET_EMPLOYEE_INFO'
const SUCCESS = 'auth/SUCCESS';
const LOGOUT = 'auth/LOGOUT'

export const { auth : {getEmployeeInfo, success, logout}} = createActions({
    [GET_EMPLOYEE_INFO] : result => ({employee : result.data}),
    [SUCCESS] : () => ({ success : true}),
    [LOGOUT] : () => ({logout : true})
})

const authReducer = handleActions({
    [GET_EMPLOYEE_INFO] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [LOGOUT] : (state, {payload}) => payload
}, initialState);

export default authReducer;