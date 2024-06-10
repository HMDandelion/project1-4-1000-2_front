import {authRequest} from "./api";
import {deleted, getSalesClient, getSalesClients, success} from "../modules/ClientModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callSalesClientsAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/clients?page=${currentPage}`);

        console.log("callSalesClientsAPI result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}

export const callSalesClientAPI = ({ clientCode }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/clients/${clientCode}`);

        console.log("callSalesClientAPI result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClient(result));
        }
    }
}

export const callClientRegistAPI = ({clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/api/v1/clients`, clientRequest);
        console.log("callClientRegistAPI result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callClientModifyAPI = ({clientCode, clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put(`/api/v1/clients/${clientCode}`, clientRequest);
        console.log("callClientModifyAPI result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callClientDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.delete(`/api/v1/clients/${code}`);
        console.log("callClientDeleteAPI result : ", result);

        if(result.status === 204) {
            const title = '성공적으로 처리되었어요.';
            statusToastAlert(title, null, 'success');
            dispatch(deleted());
        } else {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}