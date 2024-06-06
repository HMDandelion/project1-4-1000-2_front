import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts} from "../modules/ProductModules";

const DEFAULT_URL = `/api/v1/product`;
export const callProductsAPI =({currentPage = 1}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProducts(result));
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