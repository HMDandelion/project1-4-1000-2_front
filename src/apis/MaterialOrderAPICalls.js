import {authRequest} from "./api";
import {getMaterialSpecs} from "../modules/MaterialSpecModules";
import {getMaterialOrder, getMaterialOrders} from "../modules/MaterialOrderModules";


export const callMaterialOrdersAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/orders?page=${currentPage}`);

        console.log("callMaterialOrdersAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialOrders(result));
        }
    };
};

export const callMaterialOrderAPI = ({orderCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/orders/${orderCode}`);

        console.log("callMaterialOrderAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialOrder(result));
        }

    };
};