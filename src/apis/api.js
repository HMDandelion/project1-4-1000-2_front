import axios from "axios";
import {getAccessTokenHeader, getRefreshTokenHeader, removeToken, saveToken} from "../utils/TokenUtils";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const DEFAULT_URL = `${SERVER_IP}`;


export const request = async (method, url, headers, data) => {
    return await axios({
        method,
        url : `${DEFAULT_URL}${url}`,
        headers,
        data
    }).catch(error => console.log(error));
}


export const authRequest = axios.create({
    baseURL : DEFAULT_URL
});

authRequest.interceptors.request.use((config) => {
    config.headers['Access-Token'] = getAccessTokenHeader();
    return config;
});

authRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("error :", error);

        const {
            config,
            response : { status }
        } = error;

        if(status === 401) {
            const originRequest = config;

            const response = await postRefreshToken();
            console.log("response : ", response);

            if(response.status === 200) {
                saveToken(response.headers);
                originRequest.headers['Access-Token'] = getAccessTokenHeader();
                return axios(originRequest);
            } else {
                removeToken();
                window.location.replace('/');
            }
        }

        return Promise.reject(error);
    });

export async function postRefreshToken() {
    return await request(
        'POST',
        '/api/v1/refresh-token',
        { 'Refresh-Token' : getRefreshTokenHeader() }
    );
}