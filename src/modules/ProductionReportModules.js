
import { createActions, handleActions } from "redux-actions";

/* 초기 값 */
const initialState = {};

/* 액션 */
const GET_PRODUCTION_REPORTS = 'production/GET_PRODUCTION_REPORTS';
const GET_PRODUCTION_REPORT = 'production/GET_PRODUCTION_REPORT';
export const {production:{getProductionReports}} = createActions({
    [GET_PRODUCTION_REPORTS]: result => ({productionReports: result.data}),
    [GET_PRODUCTION_REPORT]: result => ({getProductionReport: result.data}),
});

/* 리듀서 */
const productionReportReducer = handleActions({
    [GET_PRODUCTION_REPORTS]: (state, { payload }) => payload,
    [GET_PRODUCTION_REPORT]: (state, {payload}) => payload,
}, initialState);

export default productionReportReducer;











// const SUCCESS = 'production/SUCCESS';
// const DELETED = "production/DELETED";



// [SUCCESS]: () => ({success: true}),
// [DELETED]: () => ({delete: true})


// [SUCCESS]: (state, {payload}) => payload,
// [DELETED]: (state, {payload}) => payload