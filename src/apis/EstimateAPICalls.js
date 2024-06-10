import {authRequest} from "./api";
import {getEstimate, getEstimates} from "../modules/EstimateModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callEstimatesAPI = ({currentPage}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/estimates?page=${currentPage}`);

        console.log("callEstimatesAPI result : ", result);
        if(result.status === 200) {
            dispatch(getEstimates(result));
        }
    }
}

export const callEstimateAPI = ({estimateCode}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/api/v1/estimates/${estimateCode}`);

            console.log("callEstimateAPI result : ", result);
            if(result.status === 200) {
                dispatch(getEstimate(result));
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }

    }
}