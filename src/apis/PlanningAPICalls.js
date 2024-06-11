import {authRequest} from "./api";
import {getPlannings} from "../modules/PlanningModules";

export const callPlanningsAPI = ({ dt }) => {
    console.log(dt);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/production/planning?dt=${dt}`);
        console.log(`callProductionPlansAPI : `, result);
        if (result.status === 200) {
            dispatch(getPlannings(result));
        }
    };
};