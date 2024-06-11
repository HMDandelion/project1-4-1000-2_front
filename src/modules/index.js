import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import workOrderReducer from "./WorkOrderModules";
import orderReducer from "./OrderModules";
import planningReducer from "./PlanningModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    authReducer,
    estimateReducer,
    orderReducer,
    // 나윤
    workOrderReducer,planningReducer,
});

export default rootReducer;