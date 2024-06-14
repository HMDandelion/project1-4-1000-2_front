import {authRequest} from "./api";
import {getPlannings} from "../modules/PlanningModules";
import {success} from "../modules/ClientModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callPlanningsAPI = ({dt}) => {
    console.log(dt);
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/api/v1/production/planning?dt=${dt}`);
            console.log(`callProductionPlansAPI : `, result);
            if (result.status === 200) {
                dispatch(getPlannings(result));
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`;
            statusToastAlert(title, desc, 'error');
        }
    };
};


export const callPlanningRegistAPI = ({productionPlanCreateRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/production/planning`, productionPlanCreateRequest);

            console.log("callPlanningRegistAPI result : ", result);
            if (result.status === 201) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`;
            statusToastAlert(title, desc, 'error');
        }
    };
};

export const callPlanningModifyAPI = ({planCode, planRequest}) => {
    return async (dispatch, getState) => {
        try {

            const result = await authRequest.put(`/api/v1/production/planning/${planCode}`, planRequest);
            console.log("callPlanningModifyAPI result : ", result);

            if (result.status === 201) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`;
            statusToastAlert(title, desc, 'error');
        }
    };
};
//마테리얼 오더에서 끌어다 씀
export const callSimplePlanningAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get('/api/v1/production/planning/today-after');

        if (result.status === 200) {
            dispatch(getPlannings(result));
        }
    };
};
