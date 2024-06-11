import {authRequest} from "./api";
import {getPlannings} from "../modules/PlanningModules";
import {success} from "../modules/ClientModules";

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

export const callPlanningModifyAPI = ({planCode, planRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put(`/api/v1/production/planning/${planCode}`, planRequest);
        console.log("callPlanningModifyAPI result : ", result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}