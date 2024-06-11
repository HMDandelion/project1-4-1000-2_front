import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouses} from "../modules/WarehouseModules";

const DEFAULT_URL = `/api/v1/warehouse`;
export const callWarehousesAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}`);

        console.log("result : ", result);
        console.log("dmd",result.data[0].name);
        if(result.status === 200) {
            dispatch(getInventoryWarehouses(result));
        }
    }
}

export const callWarehouseMove =() =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}`);

        console.log("result : ", result);
        console.log("dmd",result.data[0].name);
        if(result.status === 200) {
            dispatch(getInventoryWarehouses(result));
        }
    }
}