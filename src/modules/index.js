import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import WorkOrderReducer from "./WorkOrderModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";

const rootReducer = combineReducers({
    clientReducer,WorkOrderReducer
    authReducer, clientReducer, estimateReducer
});

export default rootReducer;