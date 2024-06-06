import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouses} from "../modules/WarehouseModules";
import {getStorageMove} from "../modules/StorageModules";

const DEFAULT_URL = `/api/v1/storage`;
export const callWarehouseMove =(warehouseCode) =>{
    return async (dispatch, getState) =>{
        console.log("번호",+warehouseCode)
        const result = await request('GET', `${DEFAULT_URL}/warehouse/${warehouseCode}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getStorageMove(result));
        }
    }
}