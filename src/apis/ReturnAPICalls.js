import {authRequest} from "./api";
import {statusToastAlert} from "../utils/ToastUtils";
import {canceled, getReturn, getReturns, success} from "../modules/ReturnModules";

export const callReturnRegistAPI = ({ returnRequest }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/returns`, returnRequest);

            console.log("callReturnRegistAPI result : ", result);
            if(result.status === 201) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callReturnsAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/returns?page=${currentPage}`);
        console.log("callReturnsAPI result : ", result);

        if(result.status === 200) {
            dispatch(getReturns(result));
        }
    }
}

export const callReturnAPI = ({returnCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/returns/${returnCode}`);
        console.log("callReturnAPI result : ", result);

        if(result.status === 200) {
            dispatch(getReturn(result));
        }
    }
}

export const callReturnCancelAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/returns/${code}`);
            console.log("callReturnCancelAPI result ", result);

            if(result.status === 201) {
                dispatch(canceled());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}