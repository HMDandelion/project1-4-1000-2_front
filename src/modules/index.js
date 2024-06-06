import {combineReducers} from "redux";
import clientReducer from "./ClientModules";
import productReducer from "./ProductModules";

const rootReducer = combineReducers({
    clientReducer,
    productReducer
});

export default rootReducer;