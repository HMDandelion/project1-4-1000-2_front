import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";
import stockReducer from "./StockModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer,
    stockReducer
});

export default rootReducer;