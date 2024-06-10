import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import workOrderReducer from "./WorkOrderModules";

const rootReducer = combineReducers({
    clientReducer,workOrderReducer,
    authReducer,estimateReducer
});

export default rootReducer;