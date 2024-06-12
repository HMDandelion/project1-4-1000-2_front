import {authRequest} from "./api";
import {getMaterialStocks} from "../modules/MaterialStockModules";
import {getMaterialDrop} from "../modules/MaterialStockDDModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callMaterialStocksAPI = ({currentPage = 1, warehouseCode, specCategoryCode}) => {
    return async (dispatch, getState) => {
        try {
            let result;
            if (warehouseCode) {
                result = await authRequest.get(`/api/v1/material/inventory?page=${currentPage}&warehouseCode=${warehouseCode}`);
            } else {
                result = await authRequest.get(`/api/v1/material/inventory?page=${currentPage}&specCategoryCode=${specCategoryCode}`);

            }

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