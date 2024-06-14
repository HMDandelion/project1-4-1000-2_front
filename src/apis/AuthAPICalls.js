import {authRequest, request} from "./api";
import {getEmployeeNo, removeToken, saveToken} from "../utils/TokenUtils";
import 'react-toastify/dist/ReactToastify.css';
import {getEmployeeInfo, logout, success} from "../modules/AuthModules";
import {statusToastAlert} from "../utils/ToastUtils";
import {setRedirectPath} from "../modules/NavigationModules";

export const callLoginAPI = ({loginRequest}) => {
    return async (dispatch, gateState) => {
        const result = await request(
            'POST',
            '/api/v1/login',
            {'Content-Type' : 'application/json'},
            JSON.stringify(loginRequest)
        );

        console.log('callLoginAPI result : ', result);

        if(result?.status === 200) {
            saveToken(result.headers);
            dispatch(success());
        } else {
            const title = '로그인에 실패했습니다.';
            const desc = '사번과 비밀번호를 확인해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`api/v1/logout`);
        console.log('callLogoutAPI result : ', result);

        if(result?.status === 200) {
            removeToken();
            dispatch(logout());
            dispatch(setRedirectPath('/login'));
        }
    }
}

export const callEmployeeInfoAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/employee/${getEmployeeNo()}`);
        console.log("callEmployeeInfoAPI result : ", result);

        if(result?.status === 200) {
            dispatch(getEmployeeInfo(result));
        }
    }
}