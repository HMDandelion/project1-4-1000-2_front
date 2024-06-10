import {authRequest, request} from "./api";
import {removeToken, saveToken} from "../utils/TokenUtils";
import 'react-toastify/dist/ReactToastify.css';
import {success} from "../modules/AuthModules";
import {createStandaloneToast} from "@chakra-ui/react";

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
            const toast = createStandaloneToast();
            toast({
                title: '로그인에 실패했습니다.',
                description: '사번과 비밀번호를 확인해주세요.',
                status: 'error',
                position: 'top',
                isClosable: true,
                duration: 3000
            })
        }
    }
}

export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`api/v1/logout`);
        console.log('callLogoutAPI result : ', result);

        if(result?.status === 200) {
            removeToken();
            dispatch(success());
        }
    }
}