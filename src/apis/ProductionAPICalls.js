import { authRequest } from "./api";
import {
    getDefectDetails,
    getProductionReport,
    getProductionReports
} from "../modules/ProductionReportModules";

export const callProductionReportsAPI = ({ currentPage }) => {
    return async (dispatch, getState) => {
        console.log("실행됬음!!!!!!!!!!");
            const result = await authRequest.get(`api/v1/production/reports?page=${currentPage}`);
            console.log("callProductionReportsAPI result : ", result);

            if (result.status === 200) {
                dispatch(getProductionReports(result)); // sgetProductionReports에는 result 전체를 전달하는 것이 아니라 result.data를 전달해야 합니다.

        }
    }
}


export const callProductionDetailAPI = ({ productionStatusCode }) => {
    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/production/reports/${productionStatusCode}/detail`)
        console.log("callProductionItemsAPI result : ", result);

        if (result.status === 200){
            dispatch(getProductionReport(result));
        }
    }
}

export const callDefectDetailAPI = ({ productionDetailCode }) => {
    return async (dispatch, getState) => {
            console.log('productionDetailCode',productionDetailCode)
        const result = await authRequest.get(`/api/v1/production/reports/${productionDetailCode}/defects`)
        console.log("callDefectDetailsAPI result : ", result);

        if (result.status === 200){
            dispatch(getDefectDetails(result));
        }
    }
}
