import { authRequest } from "./api";
import {
    getDefectDetails,
    getProductionReport,
    getProductionReports
} from "../modules/ProductionReportModules";
import {deleted, success} from "../modules/ClientModules";
import {statusToastAlert} from "../utils/ToastUtils";

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

    export const callProductionDetailAPI = ({productionStatusCode}) => {
        return async (dispatch, getState) => {

            const result = await authRequest.get(`/api/v1/production/reports/${productionStatusCode}/detail`)
            console.log("callProductionItemsAPI result : ", result);

            if (result.status === 200) {
                dispatch(getProductionReport(result));
            }
        }
    }

    export const callDefectDetailAPI = ({productionDetailCode}) => {
        return async (dispatch, getState) => {
            console.log('productionDetailCode', productionDetailCode)
            const result = await authRequest.get(`/api/v1/production/reports/${productionDetailCode}/defects`)
            console.log("callDefectDetailsAPI result : ", result);

            if (result.status === 200) {
                dispatch(getDefectDetails(result));
            }
        }
    }

export const callProductionReportReigsAPI = ({reportRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/production/reports`, reportRequest);
            console.log("callProductionReportReigsAPI result : ", result);

            if(result.status === 201) {
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callProductionReportModifyAPI = ({productionStatusCode, reportRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/production/reports/${productionStatusCode}`, reportRequest);
            console.log("callClientModifyAPI result : ", result);

            if(result.status === 201) {
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callProductionReportDeleteAPI = ({productionStatusCode}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/production/reports/${productionStatusCode}`);
            console.log("callClientDeleteAPI result : ", result);

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
