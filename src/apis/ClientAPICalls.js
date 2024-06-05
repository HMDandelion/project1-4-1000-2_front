import {request} from "./api";
import {getSalesClients} from "../modules/ClientModules";

export const callSalesClientsAPI =({currentPage = 1}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `/api/v1/clients?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}