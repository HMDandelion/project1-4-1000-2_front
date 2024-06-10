import {authRequest} from "./api";
import {getEstimate, getEstimates} from "../modules/EstimateModules";

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
        const result = await authRequest.get(`/api/v1/estimates/${estimateCode}`);

        console.log("callEstimateAPI result : ", result);
        if(result.status === 200) {
            dispatch(getEstimate(result));
        }
    }
}