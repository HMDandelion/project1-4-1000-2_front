/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_WAREHOUSES = 'warehouse/GET_INVENTORY_WAREHOUSES';

export const { warehouse : {getInventoryWarehouses}} = createActions({
    [GET_INVENTORY_WAREHOUSES] : result => ({ warehouses : result.data })
});

/* 리듀서 */
const warehouseReducer = handleActions({
    [GET_INVENTORY_WAREHOUSES] : (state, {payload}) => payload
}, initialState);

export default warehouseReducer;