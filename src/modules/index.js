import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import materialSpecReducer from "./MaterialSpecModules";
import materialStockReducer from "./MaterialStockModules";
import materialDropReducer from "./MaterialStockDDModules";

const rootReducer = combineReducers({
    authReducer, clientReducer,
    materialSpecReducer, materialStockReducer,materialDropReducer
});

export default rootReducer;