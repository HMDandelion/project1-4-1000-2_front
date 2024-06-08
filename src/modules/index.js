import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";

const rootReducer = combineReducers({
    authReducer, clientReducer, estimateReducer
});

export default rootReducer;