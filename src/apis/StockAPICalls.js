import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts} from "../modules/ProductModules";
import {getInventoryStocks, getTodayStock, productTotal, total} from "../modules/StockModules";

const DEFAULT_URL = `/api/v1/stock`;
export const callStocksAPI =({currentPage = 0}) =>{
    return async (dispatch, getState) =>{
        const result = await request('GET', `${DEFAULT_URL}?page=${currentPage}`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getInventoryStocks(result));
            console.log('누가바')
        }
    }
}

export const callTotalStockAPI =() => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `${DEFAULT_URL}/accumulate`);
            console.log("totalResult : ", result);
            if (result.status === 200) {
                dispatch(total(result));
            } else {
                console.error('데이터 로딩 실패:', result.status);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }
}

export const callProductTotalAPI =() => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `${DEFAULT_URL}/product/accumulate`);
            console.log("productTotalResult : ", result);
            if (result.status === 200) {
                dispatch(productTotal(result));
            } else {
                console.error('데이터 로딩 실패:', result.status);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }
}

export const callStockTodayAPI =() => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `${DEFAULT_URL}/today`);
            console.log("callStockTodayAPI : ", result);
            if (result.status === 200) {
                dispatch(getTodayStock(result));
            } else {
                console.error('데이터 로딩 실패:', result.status);
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    }
}


