import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import productionReportReducer from "./ProductionReportModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    authReducer,
    productionReportReducer
});

export default rootReducer;