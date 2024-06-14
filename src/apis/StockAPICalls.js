import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks, getStockWarehouse, getTodayStock, productTotal, total} from "../modules/StockModules";
import {callProductUpdateStatusAPI} from "./ProductAPICalls";

const DEFAULT_URL = `/api/v1/stock`;
export const callStocksAPI =({currentPage = 1, startDate = '', endDate = '' }) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}?page=${currentPage}&startDate=${startDate}&endDate=${endDate}`);

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
            const result = await authRequest.get( `${DEFAULT_URL}/accumulate`);
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

export const callStockWarehouseAPI =({stockCode}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest( `${DEFAULT_URL}/left/${stockCode}`);
            console.log("callStockWarehouseAPI : ", result.data);
            if (result.status === 200) {
                dispatch(getStockWarehouse(result.data));
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
            const result = await authRequest.get( `${DEFAULT_URL}/product/accumulate`);
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
            const result = await authRequest.get( `${DEFAULT_URL}/today`);
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
            const result = await authRequest.put(`${DEFAULT_URL}/${stockCode}`,updateRequest);
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
            const result = await authRequest.delete(`${DEFAULT_URL}/${selectedStock}`);
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


