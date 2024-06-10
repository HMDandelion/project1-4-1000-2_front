import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import orderReducer from "./OrderModules";

const rootReducer = combineReducers({
    authReducer, clientReducer, estimateReducer, orderReducer
});

export default rootReducer;