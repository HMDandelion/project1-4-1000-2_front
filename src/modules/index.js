import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";
import warehouseReducer from "./WarehouseModules";
import storageReducer from "./StorageModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer,
    warehouseReducer,
    storageReducer
});

export default rootReducer;