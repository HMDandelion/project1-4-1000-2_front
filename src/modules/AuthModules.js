import {createActions, handleActions} from "redux-actions";

const initialState = {};

const SUCCESS = 'auth/SUCCESS';

export const { auth : {success}} = createActions({
    [SUCCESS] : () => ({ success : true})
})

const authReducer = handleActions({
    [SUCCESS] : (state, {payload}) => payload
}, initialState);

export default authReducer;