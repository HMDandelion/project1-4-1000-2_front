import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";

export const callSalesClientsAPI =({currentPage = 1}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `/api/v1/clients?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}

export const callSalesClientAPI =({ clientCode }) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `/api/v1/clients/${clientCode}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClient(result));
        }
    }
}