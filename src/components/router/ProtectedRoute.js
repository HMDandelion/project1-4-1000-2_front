import {isAdmin, isLogin} from "../../util/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute({ loginCheck, authCheck ,children }){

    if (authCheck) {
        /* 권한이 있어야 접근 가능  (상품관리) */
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if (loginCheck) {
        /* 로그인 해야만 볼 수 있는 컴포넌트 (Ex. 마이페이지) */
        return isLogin() ? children : <Navigate to="/member/login"/>
    }else {
        /* 로그인 하면 볼 수 없는 컴포넌트 (Ex. 로그인, 회원가입) */
        return !isLogin() ? children : <Navigate to="/"/>
    }

}
export default ProtectedRoute;