/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_USAGES = 'usage/GET_MATERIAL_USAGES';
const GET_MATERIAL_USAGE = 'usage/GET_MATERIAL_USAGE';
const SUCCESS = 'usage/SUCCESS';
const DELETED = 'usage/DELETED';

export const { usage : {getMaterialUsages,getMaterialUsage, success, deleted}} = createActions({
    [GET_MATERIAL_USAGES] : result => ({ usages : result.data }),
    [GET_MATERIAL_USAGE] : result => ({ usage : result.data }),
    [SUCCESS] : () => ({success : true}),
    [DELETED] : () => ({deleted : true})
});

/* 리듀서 */
const materialUsageReducer = handleActions({
    [GET_MATERIAL_USAGES] : (state, {payload}) => payload,
    [GET_MATERIAL_USAGE] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default materialUsageReducer;