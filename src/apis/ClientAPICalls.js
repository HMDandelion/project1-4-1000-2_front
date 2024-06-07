import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients, success} from "../modules/ClientModules";

export const callSalesClientsAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/clients?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}

export const callSalesClientAPI = ({ clientCode }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/clients/${clientCode}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClient(result));
        }
    }
}

export const callClientRegistAPI = ({clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/api/v1/clients`, clientRequest);
        console.log("result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callClientModifyAPI = ({clientCode, clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/api/v1/clients/${clientCode}`, clientRequest);
        console.log("result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}