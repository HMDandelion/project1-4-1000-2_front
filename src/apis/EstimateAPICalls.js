import {authRequest} from "./api";
import {getEstimate, getEstimates, success, deleted} from "../modules/EstimateModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callEstimatesAPI = ({currentPage, searchParams}) => {
    return async (dispatch, getState) => {
        let queryString = searchParams.searchText ? `&${searchParams.selectedOption}=${searchParams.searchText}` : '';

        const result = await authRequest.get(`/api/v1/estimates?page=${currentPage}${queryString}`);

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

export const callEstimateRegistAPI = ({estimateRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/estimates`, estimateRequest);

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

export const callEstimateModifyAPI = ({estimateCode, estimateRequest}) => {
    console.log("estimate code : ", estimateCode);
    console.log("estimateReqeust : ", estimateRequest);

    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/estimates/${estimateCode}`, estimateRequest);

            console.log("callEstimateModifyAPI result : ", result);
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

export const callEstimateDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/estimates/${code}`);
            console.log("callEstimateDeleteAPI result : ", result);

            if(result.status === 204) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(deleted());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}