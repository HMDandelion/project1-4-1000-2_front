import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";

const DEFAULT_URL = `/api/v1/stock`;
export const callStocksAPI =({currentPage = 0}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getInventoryStocks(result));
        }
    }
}
