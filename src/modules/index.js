import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import releaseReducer from "./ReleaseModules";
import estimateReducer from "./EstimateModules";
import workOrderReducer from "./WorkOrderModules";
import orderReducer from "./OrderModules";
import planningReducer from "./PlanningModules";
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialOrderReducer from "./MaterialOrderModules";
import materialDropReducer from "./MaterialStockDDModules";
import materialUsageReducer from "./MaterialUsageModules";
import returnReducer from "./ReturnModules";
import navigationReducer from "./NavigationModules";
import planningOrderReducer from "./PlanningOrderModules";

const rootReducer = combineReducers({

    navigationReducer,

    //예원
    clientReducer,
    authReducer,
    estimateReducer,
    orderReducer,
    returnReducer,

    //동환
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    releaseReducer,

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