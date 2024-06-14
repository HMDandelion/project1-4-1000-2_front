import {createActions, handleActions} from "redux-actions";

const initialState = {};

const SET_REDIRECT_PATH = 'navigation/SET_REDIRECT_PATH'

export const { navigation : {setRedirectPath}} = createActions({
    [SET_REDIRECT_PATH] : path => path
})

const navigationReducer = handleActions({
    [SET_REDIRECT_PATH] : (state, {payload}) => payload
}, initialState);

export default navigationReducer;