import {authRequest} from "./api";
import {getMaterialStock, getMaterialStocks} from "../modules/MaterialStockModules";
import {getMaterialDrop} from "../modules/MaterialStockDDModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callMaterialStocksAPI = ({currentPage = 1, warehouseCode, specCategoryCode,searchParams}) => {
    return async (dispatch, getState) => {
        try {
            let url = `/api/v1/material/inventory?page=${currentPage}`;


            if (warehouseCode) {
                url += `&warehouseCode=${warehouseCode}`
            } else {
                url += `&specCategoryCode=${specCategoryCode}`
            }
            if (searchParams.searchText) {
                url += `&materialName=${searchParams.searchText}`;
            }

           const result = await authRequest.get(url);
            console.log("callMaterialStocksAPI result : ", result);
            if (result.status === 200) {
                dispatch(getMaterialStocks(result));
            }
        }catch (error) {
            statusToastAlert("검색결과 없음.", "요청하신 조건에 맞는 검색결과가 존재하지 않습니다.", 'error');
        }
    };
};

export const callMaterialDropAPI = ({searchType = "w"}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/inventory/dropdown?searchType=${searchType}`);
        console.log("callMaterialDropAPI result : ",result);

        if (result.status === 200) {

            dispatch(getMaterialDrop(result));
        }
    };
};

export const callMaterialStockAPI = ({stockCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/material/inventory/${stockCode}`);
        console.log("callMaterialStockAPI result : ",result);

        if (result.status === 200) {
            dispatch(getMaterialStock(result));
        }
    };
};