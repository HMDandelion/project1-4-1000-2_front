/* 초기 값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 */
const GET_INVENTORY_WAREHOUSES = 'warehouse/GET_INVENTORY_WAREHOUSES';
const GET_INVENTORY_WAREHOUSE = 'warehouse/GET_INVENTORY_WAREHOUSE';

export const { warehouse : {getInventoryWarehouses,getInventoryWarehouse}} = createActions({
    [GET_INVENTORY_WAREHOUSES] : result => ({ warehouses : result.data }),
    [GET_INVENTORY_WAREHOUSE] : result => ({ warehouse : result.data })
});

/* 리듀서 */
const warehouseReducer = handleActions({
    [GET_INVENTORY_WAREHOUSES] : (state, {payload}) => ({
        ...state,
        ...payload
    }),
    [GET_INVENTORY_WAREHOUSE] : (state, {payload}) => ({
        ...state,
        ...payload
    })
}, initialState);

export default warehouseReducer;