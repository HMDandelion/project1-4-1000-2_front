/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
    storages: [] // 초기 상태에 'storages' 배열 추가
};

/* 액션 */
const GET_STORAGE_MOVE = 'storage/GET_STORAGE_MOVE';
const GET_DESTROYS = 'storage/GET_DESTROYS';
const GET_PRODUCT_DESTROY = 'storage/GET_PRODUCT_DESTROY';

export const { storage : {getStorageMove,getDestroys,getProductDestroy}} = createActions({
    [GET_STORAGE_MOVE] : result => ({ storages : result.data }),
    [GET_DESTROYS] : result => ({destroys : result}),
    [GET_PRODUCT_DESTROY] : result => ({productDestroy:result})
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
    })
}, initialState);

export default storageReducer;