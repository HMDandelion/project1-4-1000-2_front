import {authRequest} from "./api";
import {getMaterialSpecs} from "../modules/MaterialSpecModules";
import {getMaterialOrder, getMaterialOrders, success} from "../modules/MaterialOrderModules";


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

export const callMaterialOrderRegistAPI = ({orderRequest}) => {
    return async (dispatch, getState) => {
        console.log(orderRequest);
        const result = await authRequest.post(`api/v1/material/orders`, orderRequest);

        if (result.status === 201) {
            dispatch(success());
        }
    };
};