
import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initialState = {};

/* 액션 */
const GET_PRODUCTION_REPORTS = 'production/GET_PRODUCTION_REPORTS';
const GET_PRODUCTION_REPORT = 'production/GET_PRODUCTION_REPORT';
const GET_DEFECT_DETAILS = 'production/GET_DEFECT_DETAILS';
export const {production:{getProductionReports, getProductionReport, getDefectDetails}} = createActions({
    [GET_PRODUCTION_REPORTS]: result => ({productionReports: result.data}),
    [GET_PRODUCTION_REPORT]: result => ({productionReport: result.data}),
    [GET_DEFECT_DETAILS]: result => ({defectDetails: result.data})
});

/* 리듀서 */
const productionReportReducer = handleActions({
    [GET_PRODUCTION_REPORTS]: (state, { payload }) => payload,
    [GET_PRODUCTION_REPORT]: (state, {payload}) => payload,
    [GET_DEFECT_DETAILS]: (state, {payload}) => payload
}, initialState);

export default productionReportReducer;











// const SUCCESS = 'production/SUCCESS';
// const DELETED = "production/DELETED";



// [SUCCESS]: () => ({success: true}),
// [DELETED]: () => ({delete: true})


// [SUCCESS]: (state, {payload}) => payload,
// [DELETED]: (state, {payload}) => payload