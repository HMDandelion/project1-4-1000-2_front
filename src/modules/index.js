import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import WorkOrderReducer from "./WorkOrderModules";

const rootReducer = combineReducers({
    clientReducer,WorkOrderReducer
});

export default rootReducer;