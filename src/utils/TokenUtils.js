import {jwtDecode} from "jwt-decode";
import {statusToastAlert} from "./ToastUtils";

const BEARER = 'Bearer ';

export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

const getAccessToken = () => {
    const accessToken = localStorage.getItem('access-token');
    return accessToken ? accessToken : statusToastAlert("토큰값이 유효하지 않습니다.", null, 'error');
}
const getRefreshToken = () => localStorage.getItem('refresh-token');

export const getAccessTokenHeader = () => BEARER + getAccessToken();
export const getRefreshTokenHeader = () => BEARER + getRefreshToken();

const getDecodeAccessToken = () => {
    return jwtDecode(getAccessToken());
}
const getDecodeRefreshToken = () => jwtDecode(getRefreshToken());

export const isLogin = () => {
    return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000);
}
export const getEmployeeNo = () => {
    return getDecodeAccessToken().employeeNo;
}