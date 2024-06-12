/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_DROP = 'drop/GET_MATERIAL_DROP';

export const { drop : {getMaterialDrop}} = createActions({
    [GET_MATERIAL_DROP] : result => ({dropdown: result.data})
});

/* 리듀서 */
const materialDropReducer = handleActions({
    [GET_MATERIAL_DROP] : (state,{payload}) => payload
}, initialState);

export default materialDropReducer;