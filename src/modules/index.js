import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import orderReducer from "./OrderModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    authReducer,
    estimateReducer,
    orderReducer
});

export default rootReducer;