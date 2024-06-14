import {authRequest, request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getEmployees, getInventoryProducts, getProductClient, success} from "../modules/ProductModules";
import {
    getDestroys, getMovePage,
    getProductDestroy,
    getStorageMove,
    getStorages,
    getStoragesPage,
    getStore
} from "../modules/StorageModules";
import {useState} from "react";

const DEFAULT_URL = `/api/v1/storage`;
export const callWarehouseMove =({currentPage=1,warehouseCode}) =>{
    return async (dispatch, getState) =>{
        console.log("번호",+warehouseCode)
        const result = await authRequest.get( `${DEFAULT_URL}/warehouse/${warehouseCode}?page=${currentPage}`);

        console.log("callWarehouseMove : ", result);
        if(result.status === 200) {
            dispatch(getStorageMove(result));
            dispatch(getMovePage(result));
        }
    }
}

export const callDestroysTotalAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get(`${DEFAULT_URL}/destroy`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getDestroys(result));
        }
    }
}

export const callProductDestroyAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `${DEFAULT_URL}/product/destroy`);

        console.log("result : ", result);
        if(result.status === 200) {
            dispatch(getProductDestroy(result));
        }
    }
}

export const callRegistDestroyAPI = ({ updateRequest,onSuccess,storageCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`${DEFAULT_URL}/destroy/${storageCode}`,updateRequest);
            console.log('callRegistDestroyAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('파손 등록 실패:', result);
                throw new Error('파손 등록 실패');
            }
        } catch (error) {
            console.error('파손 등록 중 오류 발생:', error);
            throw error;
        }
    }
};



export const callStockAssignment = ({ updateRequest,onSuccess,stockCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/storage/stock/${stockCode}`,updateRequest);
            console.log('callStockAssignment result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('창고 배정 실패:', result);
            }
        } catch (error) {
            console.error('창고 배정 중 오류 발생:', error);
        }
    }
};

export const callStoreAPI =({stockCode}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get(`${DEFAULT_URL}/stock/${stockCode}`);

        console.log("callStoreAPI : ", result);
        if(result.status === 200) {
            dispatch(getStore(result));
        }
    }
}
export const callStoragesAPI =({warehouseCode,currentPage=1}) =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get(`${DEFAULT_URL}/filter/${warehouseCode}?page=${currentPage}`);

        console.log("callStoragesAPI : ", result);

        console.log("팝콘",result)
        if(result.status === 200) {
            dispatch(getStorages(result.data.content));
            dispatch(getStoragesPage(result));
        }
    }
}

export const callEmployeesAPI =() =>{
    return async (dispatch, getState) =>{
        const result = await authRequest.get( `/api/v1/employee/list`);

        console.log("callEmployeesAPI : ", result);
        if(result.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}

export const callCancelAssignmentAPI = ({onSuccess,storageCode}) =>{
    return async(dispatch,getState) => {
        try {
            const result = await authRequest.delete(`${DEFAULT_URL}/${storageCode}`);
            console.log('callCancelAssignmentAPI result : ',result);

            if(result.status === 204) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('배정 취소 실패:', result);
            }
        } catch (error) {
            console.error('배정 취소 중 오류 발생:', error);
        }
    }
}


