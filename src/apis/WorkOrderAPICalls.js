import {authRequest} from "./api";
import {getWorkOrders, success} from "../modules/WorkOrderModules";


/* 작업 지시서 조회 */
export const WorkOrderAPICalls = ({ currentPage = 1 }) => {
    return async ( dispatch, getState ) => {
        const result = await authRequest.get(`/api/v1/production/work-order?page=${currentPage}`);
        console.log(`WorkOrderAPICalls : `, result);
        if (result.status === 200) {
            dispatch(getWorkOrders(result));
        }
    }
}

/* 작업 지시서 등록 */
export const callWorkOrderRegistAPI = ( {registRequest} ) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/api/v1/production/work-order`, registRequest );
        console.log('callWorkOrderRegistAPI result : ',result);

        if (result.status === 201) {
            dispatch(success());
        }
    }
}