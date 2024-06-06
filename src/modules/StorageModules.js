/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
    storages: [] // 초기 상태에 'storages' 배열 추가
};

/* 액션 */
const GET_STORAGE_MOVE = 'storage/GET_STORAGE_MOVE';

export const { storage : {getStorageMove}} = createActions({
    [GET_STORAGE_MOVE] : result => ({ storages : result.data })
});

/* 리듀서 */
const storageReducer = handleActions({
    [GET_STORAGE_MOVE]: (state, { payload }) => ({
        ...state, // 기존 상태 유지
        ...payload // 'storages' 정보 업데이트
    })
}, initialState);

export default storageReducer;