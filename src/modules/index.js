import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import authReducer from "./AuthModules";

const rootReducer = combineReducers({
    authReducer, clientReducer
});

export default rootReducer;