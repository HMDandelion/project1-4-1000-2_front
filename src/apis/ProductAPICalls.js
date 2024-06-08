import {request} from "./api";
import {getSalesClient, getSalesClients} from "../modules/ClientModules";
import {getInventoryProductList, getInventoryProducts, success} from "../modules/ProductModules";

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
export const callProductRegistAPI = ({ registRequest,onSuccess }) => {

    return async (dispatch, getState) => {
        try {
        const result = await request('POST',`${DEFAULT_URL}`,{'Content-Type':'application/json'}, JSON.stringify(registRequest));
        console.log('callProductRegistAPI result : ',result);

        if(result.status === 201) {
            dispatch(success());
            onSuccess && onSuccess();
        }else {
            console.error('상품 등록 실패:', result);
        }
        } catch (error) {
            console.error('상품 등록 중 오류 발생:', error);
        }
    }
};

export const callProductUpdateAPI = ({ updateRequest,onSuccess,productCode }) => {

    return async (dispatch, getState) => {
        try {
            const result = await request('PUT',`${DEFAULT_URL}/${productCode}`,{'Content-Type':'application/json'}, JSON.stringify(updateRequest));
            console.log('callProductUpdateAPI result : ',result);

            if(result.status === 201) {
                dispatch(success());
                onSuccess && onSuccess();
            }else {
                console.error('상품 수정 실패:', result);
            }
        } catch (error) {
            console.error('상품 수정 중 오류 발생:', error);
        }
    }
};

export const callProductListAPI = () => {
    return async (dispatch, getState) =>{
        const result = await request('GET', `/api/v1/products`);

        console.log("상품리스트 : ", result);
        if(result.status === 200) {
            dispatch(getInventoryProductList(result));
        }
    }
}



