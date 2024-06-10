import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import productionReportReducer from "./ProductionReportModules";

const rootReducer = combineReducers({
    authReducer, clientReducer,productionReportReducer
});


export default rootReducer;