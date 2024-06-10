import {authRequest, request} from "./api";
import {deleted, getWorkOrder, getWorkOrders, success} from "../modules/WorkOrderModules";
import {statusToastAlert} from "../utils/ToastUtils";


/* 작업 지시서 조회 */
export const WorkOrderAPICalls = ({ currentPage }) => {
    return async ( dispatch, getState ) => {
        const result = await authRequest.get(`/api/v1/production/work-order?page=${currentPage}`);
        console.log(`WorkOrderAPICalls : `, result);
        if (result.status === 200) {
            dispatch(getWorkOrders(result));
        }
    }
}

/* 작업 지시서 상세 조회 */
export const WorkOrderAPICall = ({ workOrderCode }) => {
    return async ( dispatch, getState ) => {
        console.log(`workOrderCode : `, workOrderCode)
        const result = await authRequest.get(`/api/v1/production/work-order/${workOrderCode}`);
        console.log(`WorkOrderAPICall : `, result);
        if (result.status === 200) {
            dispatch(getWorkOrder(result));
        }
    }
}
/* 작업 지시서 라인 조회 */
// export const WorkOrderLineAPICalls = () => {
//     return async ( dispatch, getState ) => {
//         const result = await authRequest.get(`/api/v1/lines`);
//         console.log(`WorkOrderLineAPICalls : `, result);
//         if (result.status === 200) {
//             dispatch(getWorkOrder(result));
//         }
//     }
// }

/* 작업 지시서 등록 */
export const callWorkOrderRegistAPI = ( { registRequest } ) => {
    return async (dispatch, getState) => {
        const result = await request('POST', `/api/v1/production/work-order`,
            {'Content-Type' : 'application/json' },
            JSON.stringify(registRequest));
        console.log("result : ", result);
        if (result.status === 201) {
            dispatch(success());
        }
    }
}

/* 작업 지시서 수정 */
export const callWorkOrderModifyAPI = ({workOrderCode, clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await request('PUT', `/api/v1/production/work-order/${workOrderCode}`,
            {'Content-Type' : 'application/json' },
            JSON.stringify(clientRequest));
        console.log("result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callWorkOrderDeleteAPI = ({ code }) => {
    return async (dispatch, getState) => {
        console.log( `workOrderCode : `, code);
        const result = await authRequest.delete(`/api/v1/production/work-order/${code}`);
        console.log("callWorkOrderDeleteAPI result : ", result);
        if(result.status === 204) {
            const title = '성공적으로 처리되었어요.';
            statusToastAlert(title, null, 'success');
            dispatch(deleted());
        } else {
            const title = '문제가 발생했어요.';
            const desc = '다시 시도해주세요.';
            statusToastAlert(title, desc, 'error');
        }
    }
}