import {authRequest} from "./api";
import {getEstimate, getEstimates, success} from "../modules/EstimateModules";
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

export const callEstimateRegistAPI = ({registRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/estimates`, registRequest);

            console.log("callEstimateRegistAPI result : ", result);
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