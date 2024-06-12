import {authRequest} from "./api";
import {getMaterialSpecs} from "../modules/MaterialSpecModules";
import {getMaterialOrders} from "../modules/MaterialOrderModules";


export const callMaterialOrdersAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/orders?page=${currentPage}`);

        console.log("callMaterialOrdersAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialOrders(result));
        }
    };
};