import {request} from "./api";
import {getSalesClient, getSalesClients, success} from "../modules/ClientModules";

export const callSalesClientsAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/clients?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}

export const callSalesClientAPI = ({ clientCode }) => {
    return async (dispatch, getState) => {
        const result = await request('GET', `/api/v1/clients/${clientCode}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClient(result));
        }
    }
}

export const callClientRegistAPI = ({clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await request('POST', `/api/v1/clients`,
            {'Content-Type' : 'application/json' },
            JSON.stringify(clientRequest));
        console.log("result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callClientModifyAPI = ({clientCode, clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await request('PUT', `/api/v1/clients/${clientCode}`,
            {'Content-Type' : 'application/json' },
            JSON.stringify(clientRequest));
        console.log("result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}