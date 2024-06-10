import {createActions, handleActions} from "redux-actions";

/* 초기 값 */
const initalState ={};

/* 액션 */
const GET_PRODUCTION_REPORTS = 'procution/GET_PRODUCTION_REPORTS';
const GET_PRODUCTION_REPORT = 'procution/GET_PRODUCTION_REPORT';
const SUCCESS = 'production/SUCCESS';
const DELETED = "production/DELETED";

export const {productionReport : {getProductionReports, getProductionReport, success, deleted
}} = createActions({
    [GET_PRODUCTION_REPORTS] : result => ({getProductionReports : result.data}),
    // [GET_PRODUCTION_REPORT] : result => ({getProductionReport : result.data}),
    [SUCCESS] : () => ({success : true})
    //     [DELETED] : () => ({delete : true})
});

/* 리듀서 함수 */
const productionReportReducer = handleActions({
[GET_PRODUCTION_REPORTS] : (state, {payload}) => payload
}, initalState);

export default productionReportReducer;
