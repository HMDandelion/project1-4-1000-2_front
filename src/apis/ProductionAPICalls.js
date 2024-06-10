import {authRequest, request} from "./api";
import {getProductionReports} from "../modules/ProductionReportModules";

export const callProductionReportsAPI = ({currentPage =1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/vi/production-items?page=${currentPage}`)
        console.log("callProductionItemsAPI result : ", result);
        if (result.status === 200){
            dispatch(getProductionReports(result));
        }
    }
}
//
// export const callProductionReportAPI = ({currentPage =1}) => {
//     return async (dispatch, getState) => {
//         const result = await authRequest.get(`api/vi/production/reports/${productionStateCode}`)
//         console.log("callProductionItemsAPI result : ", result);
//         if (result.status === 200){
//             dispatch(getProductionReports(result));
//         }
//     }
// }

