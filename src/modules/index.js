import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialOrderReducer from "./MaterialOrderModules";
import materialDropReducer from "./MaterialStockDDModules";

let rootReducer;
rootReducer = combineReducers({
    authReducer, clientReducer,
    materialDropReducer, materialOrderReducer, materialSpecReducer, materialStockReducer
});

export default rootReducer;