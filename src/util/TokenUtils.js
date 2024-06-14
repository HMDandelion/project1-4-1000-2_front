import {jwtDecode} from "jwt-decode";


const BEARER = "Bearer ";

export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

/*  */
export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

const getAccessToken = () => localStorage.getItem('access-token');
const getRefreshToken = () => localStorage.getItem('refresh-token');

export const getAccessTokenHeader = () =>{
    console.log(getAccessToken())
    return BEARER + getAccessToken()};
export const getRefreshTokenHeader = () => BEARER + getRefreshToken();

const getDecodeAccessToken = () => jwtDecode(getAccessToken());

/* npm install jwt-decode 라이브러리 설치 */
const getDecodeRefreshToken = () => jwtDecode(getRefreshToken());

export const isLogin = () => {
    return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000)
}

/* 로그인이 되어 있는지 유효한지 */
export const isAdmin = () => {
    return isLogin() && getDecodeAccessToken().memberRole === 'ROLE_ADMIN';
}

/* token에서 id 꺼내오기 */
export const getMemberId = () => {

    return getDecodeAccessToken().memberId;
}

