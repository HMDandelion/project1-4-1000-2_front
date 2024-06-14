import {authRequest} from "./api";
import {canceled, getOrder, getOrders, success} from "../modules/OrderModules";
import {statusToastAlert} from "../utils/ToastUtils";
import {getPlanningOrder} from "../modules/PlanningOrderModules";

export const callOrderRegistAPI = ({ estimateCode }) => {
    const formData = new URLSearchParams();
    formData.append('estimateCode', estimateCode);

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/orders`, formData);
            console.log("callOrderRegistAPI result : ", result);
            if(result.status === 201) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }

}

export const callOrdersAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/orders?page=${currentPage}`);

        console.log("callOrdersAPI result : ", result);
        if(result.status === 200) {
            dispatch(getOrders(result));
        }
    }
}

export const callOrderAPI = ({orderCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/orders/${orderCode}`);
        console.log("callOrderAPI result : ", result);
        if(result.status === 200) {
            dispatch(getOrder(result));
        }
    }
}

export const callOrderCancelAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/orders/${code}`);
            console.log("callOrderCancelAPI result : ", result);
            if(result.status === 201) {
                dispatch(canceled());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }

    }
}

/* 나윤 */
export const callPlanningOrdersAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/orders/production/planning/list?page=${currentPage}`);

        console.log("callPlanningOrdersAPI result : ", result);
        if(result.status === 200) {
            dispatch(getPlanningOrder(result));
        }
    }
}