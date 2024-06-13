/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_MATERIAL_SPECS = 'specs/GET_MATERIAL_SPECS';
const GET_MATERIAL_SPEC = 'specs/GET_MATERIAL_SPEC';
const SUCCESS = 'specs/SUCCESS';
const DELETED = 'specs/DELETED';

export const { specs : {getMaterialSpecs, getMaterialSpec, success, deleted}} = createActions({
    [GET_MATERIAL_SPECS] : result => ({ specs : result.data }),
    [GET_MATERIAL_SPEC] : result => ({ spec : result.data }),
    [SUCCESS] : () => ({success : true}),
    [DELETED] : () => ({deleted : true})
});

/* 리듀서 */
const materialSpecReducer = handleActions({
    [GET_MATERIAL_SPECS] : (state, {payload}) => payload,
    [GET_MATERIAL_SPEC] : (state, {payload}) => payload,
    [SUCCESS] : (state, {payload}) => payload,
    [DELETED] : (state, {payload}) => payload
}, initialState);

export default materialSpecReducer;