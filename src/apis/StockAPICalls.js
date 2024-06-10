import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks, getTodayStock, productTotal, total} from "../modules/StockModules";
import {callProductUpdateStatusAPI} from "./ProductAPICalls";

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

export const callStockUpdateAPI = ({ updateRequest,onSuccess,stockCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('PUT',`${DEFAULT_URL}/${stockCode}`,{'Content-Type':'application/json'}, JSON.stringify(updateRequest));
            console.log('callStockUpdateAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('재고 수정 실패:', result);
            }
        } catch (error) {
            console.error('재고 수정 중 오류 발생:', error);
        }
    }
};


export const callStockDeleteAPI = ({ onSuccess,selectedStock }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE',`${DEFAULT_URL}/${selectedStock}`,{'Content-Type':'application/json'});
            console.log('callStockDeleteAPI result : ',result);

            if(result.status === 204) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('재고 삭제 실패:', result);
            }
        } catch (error) {
            console.error('재고 삭제 중 오류 발생:', error);
        }
    }
};


