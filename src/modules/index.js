import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";
import materialSpecReducer from "./MaterialSpecModules";

const rootReducer = combineReducers({
    authReducer, clientReducer,
    materialSpecReducer
});

export default rootReducer;