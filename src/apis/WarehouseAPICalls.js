import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProducts, success} from "../modules/ProductModules";
import {getInventoryStocks} from "../modules/StockModules";
import {getInventoryWarehouse, getInventoryWarehouses} from "../modules/WarehouseModules";

const DEFAULT_URL = `/api/v1/warehouse`;
export const callWarehousesAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}`);

        console.log("callWarehousesAPI : ", result);
        if(result.status === 200) {
            dispatch(getInventoryWarehouses(result));
        }
    }
}

export const callWarehouseUpdateAPI = ({ updateRequest, onSuccess, warehouseCode }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put( `/api/v1/warehouse/${warehouseCode}`, updateRequest);
            console.log('callWarehouseUpdateAPI result : ', result);

            if (result && result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            } else {
                console.error('창고 수정 실패:', result);
                throw new Error('창고 수정 실패');
            }
        } catch (error) {
            console.error('창고 수정 중 오류 발생:', error);
            throw error;
        }
    }
};

export const callWarehouseSaveAPI = ({ updateRequest, onSuccess }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post( `${DEFAULT_URL}`, updateRequest);
            console.log('callWarehouseSaveAPI result : ', result);

            if (result && result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            } else {
                console.error('창고 등록 실패:', result);
                throw new Error('창고 등록 실패');
            }
        } catch (error) {
            console.error('창고 등록 중 오류 발생:', error);
            throw error;
        }
    }
};

export const callWarehouseAPI =({warehouseCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/${warehouseCode}`);

        console.log("callWarehouseAPI : ", result);
        if(result.status === 200) {
            dispatch(getInventoryWarehouse(result));
        }
    }
}
