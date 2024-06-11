import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouse, getInventoryWarehouses} from "../modules/WarehouseModules";
import {
    getExpectedRelease,
    getOrderProducts,
    getReleaseExpected, getReleaseLack,
    getReleaseOrders,
    getReleaseOrdersPage
} from "../modules/ReleaseModules";

const DEFAULT_URL = `/api/v1/release`;
export const callReleaseOrdersAPI =({currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/orders?page=${currentPage}`);

        console.log("callReleaseOrdersAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseOrders(result));
            dispatch(getReleaseOrdersPage(result));
        }
    }
}

export const callOrderProduct =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/order/${orderCode}`);

        console.log("callReleaseOrdersAPI : ", result);
        if(result.status === 200) {
            dispatch(getOrderProducts(result));
        }
    }
}

export const callReleaseExpectedAPI =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/storage/${orderCode}`);

        console.log("callReleaseExpectedAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseExpected(result));
        }
    }
}

export const callReleaseLackAPI =({orderCode}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}/order/lack/${orderCode}`);

        console.log("callReleaseLackAPI : ", result);
        if(result.status === 200) {
            dispatch(getReleaseLack(result));
        }
    }
}