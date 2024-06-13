import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import orderReducer from "./OrderModules";
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialOrderReducer from "./MaterialOrderModules";
import materialDropReducer from "./MaterialStockDDModules";
import materialUsageReducer from "./MaterialUsageModules";
import productionReportReducer from "./ProductionReportModules";

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

    //한결
    materialDropReducer,
    materialOrderReducer,
    materialSpecReducer,
    materialStockReducer,
    materialUsageReducer,

    //승재
    productionReportReducer
});

export default rootReducer;