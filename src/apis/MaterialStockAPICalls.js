import {authRequest} from "./api";
import {getMaterialSpecs} from "../modules/MaterialSpecModules";
import {getMaterialStocks} from "../modules/MaterialStockModules";
import {getMaterialDrop} from "../modules/MaterialStockDDModules";

export const callMaterialStocksAPI = ({currentPage = 1, warehouseCode, specCategoryCode}) => {
    return async (dispatch, getState) => {
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
    };
};

export const callMaterialDropAPI = ({searchType = "w"}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/inventory/dropdown?searchType=${searchType}`);
        console.log("callMaterialDropAPI result : ",result);
        dispatch(getMaterialDrop(result));
    };
};