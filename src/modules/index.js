import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import estimateReducer from "./EstimateModules";
import workOrderReducer from "./WorkOrderModules";
import orderReducer from "./OrderModules";

const rootReducer = combineReducers({
    clientReducer,workOrderReducer,
    authReducer,estimateReducer,
    orderReducer
});

export default rootReducer;