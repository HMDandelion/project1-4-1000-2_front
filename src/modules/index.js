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
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialOrderReducer from "./MaterialOrderModules";
import materialDropReducer from "./MaterialStockDDModules";
import materialUsageReducer from "./MaterialUsageModules";
import planningOrderReducer from "./PlanningOrderModules";

const rootReducer = combineReducers({

    //예원
    clientReducer,
    authReducer,
    estimateReducer,
    orderReducer,

    //동환
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,

    // 나윤
    workOrderReducer,
    planningReducer,
    planningOrderReducer,

    //한결
    materialDropReducer,
    materialOrderReducer,
    materialSpecReducer,
    materialStockReducer,
    materialUsageReducer

});

export default rootReducer;