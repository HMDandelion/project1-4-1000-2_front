import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";
import authReducer from "./AuthModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer,
    authReducer
});

export default rootReducer;