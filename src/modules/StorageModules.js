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
const GET_STORAGES_PAGE = 'storage/GET_STORAGES_PAGE';
const GET_MOVE_PAGE = 'storage/GET_MOVE_PAGE';

export const { storage : {getStorageMove,getDestroys,getProductDestroy,getStore,getStorages,getStoragesPage,getMovePage}} = createActions({
    [GET_STORAGE_MOVE] : result => ({ storageMove : result.data }),
    [GET_DESTROYS] : result => ({destroys : result}),
    [GET_PRODUCT_DESTROY] : result => ({productDestroy:result}),
    [GET_STORE] : result => ({store:result}),
    [GET_STORAGES] : result => ({storages:result}),
    [GET_STORAGES_PAGE] : result => ({storagesPage:result}),
    [GET_MOVE_PAGE] : result => ({movePage:result})
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
    }),
    [GET_STORAGES_PAGE]: (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_MOVE_PAGE]: (state, { payload }) => ({
        ...state,
        ...payload
    })
}, initialState);

export default storageReducer;