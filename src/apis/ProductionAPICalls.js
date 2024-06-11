import { authRequest } from "./api";
import { getProductionReports } from "../modules/ProductionReportModules";

export const callProductionReportsAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
            const result = await authRequest.get(`api/v1/production/reports?page=${currentPage}`);
            console.log("callProductionReportsAPI result : ", result);
            if (result.status === 200) {
                dispatch(getProductionReports(result.data)); // getProductionReports에는 result 전체를 전달하는 것이 아니라 result.data를 전달해야 합니다.

        }
    }
}


export const callProductionReportAPI = ({currentPage =1}) => {
    return async (dispatch, getState) => {
        let productionStateCode;
        const result = await authRequest.get(`api/vi/production/reports/${productionStateCode}`)
        console.log("callProductionItemsAPI result : ", result);
        if (result.status === 200){
            dispatch(getProductionReports(result));
        }
    }
}
