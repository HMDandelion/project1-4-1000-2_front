/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_DROP = 'drop/GET_MATERIAL_DROP';
const SUCCESS_DROP = 'drop/SUCCESS_DROP';
const DELETED = 'drop/DELETED';

export const { drop : {getMaterialDrop, successDrop, deleted}} = createActions({
    [GET_MATERIAL_DROP] : result => ({dropdown: result.data}),
    [SUCCESS_DROP] : () => ({successDrop : true}),
    [DELETED] : (state, {payload}) => payload
});

/* 리듀서 */
const materialDropReducer = handleActions({
    [GET_MATERIAL_DROP] : (state,{payload}) => payload,
    [SUCCESS_DROP] : () => ({successDrop : true}),
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default materialDropReducer;