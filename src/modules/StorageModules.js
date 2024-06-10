/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
};

/* 액션 */
const GET_STORAGE_MOVE = 'storage/GET_STORAGE_MOVE';
const GET_DESTROYS = 'storage/GET_DESTROYS';
const GET_PRODUCT_DESTROY = 'storage/GET_PRODUCT_DESTROY';
const GET_STORE = 'storage/GET_STORE';
const GET_STORAGES = 'storage/GET_STORAGES';

export const { storage : {getStorageMove,getDestroys,getProductDestroy,getStore,getStorages}} = createActions({
    [GET_STORAGE_MOVE] : result => ({ storageMove : result.data }),
    [GET_DESTROYS] : result => ({destroys : result}),
    [GET_PRODUCT_DESTROY] : result => ({productDestroy:result}),
    [GET_STORE] : result => ({store:result}),
    [GET_STORAGES] : result => ({storages:result})
});

/* 리듀서 */
const storageReducer = handleActions({
    [GET_STORAGE_MOVE]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_DESTROYS]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_PRODUCT_DESTROY]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_STORE]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_STORAGES]: (state, { payload }) => ({
        ...state,
        ...payload
    })
}, initialState);

export default storageReducer;