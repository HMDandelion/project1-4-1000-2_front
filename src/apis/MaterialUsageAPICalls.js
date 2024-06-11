import {authRequest} from "./api";
import {getMaterialSpecs} from "../modules/MaterialSpecModules";
import {getMaterialOrders} from "../modules/MaterialOrderModules";
import {getMaterialUsages} from "../modules/MaterialUsageModules";


export const callMaterialUsagesAPI = ({currentPage,searchType}) => {
    return async (dispatch, getState) => {
        searchType = searchType === 'n' ? 'not_complete' : 'complete';
        const result = await authRequest.get(`/api/v1/material/use?page=${currentPage}&sortType=${searchType}`);

        console.log("callMaterialUsagesAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialUsages(result));
        }
    };
};