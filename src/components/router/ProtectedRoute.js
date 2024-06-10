import {isLogin} from "../../utils/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute({loginCheck, authCheck, children}) {

    if(loginCheck) {
        return isLogin() ? children : <Navigate to="/login"/>
    } else {
        return !isLogin() ? children : <Navigate to="/"/>
    }
}

export default ProtectedRoute;