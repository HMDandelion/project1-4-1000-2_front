import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_EMPLOYEE_INFO = 'auth/GET_EMPLOYEE_INFO'
const SUCCESS = 'auth/SUCCESS';

export const { auth : {getEmployeeInfo, success}} = createActions({
    [GET_EMPLOYEE_INFO] : result => ({employee : result.data}),
    [SUCCESS] : () => ({ success : true})
})

const authReducer = handleActions({
    [GET_EMPLOYEE_INFO] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload
}, initialState);

export default authReducer;