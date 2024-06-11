import {authRequest} from "./api";
import {getMaterialSpec, getMaterialSpecs} from "../modules/MaterialSpecModules";

export const callMaterialSpecsAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/spec?page=${currentPage}`);

        console.log("callMaterialSpecsAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialSpecs(result));
        }
    };
};

export const callMaterialSpecAPI = ({specCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/material/spec/${specCode}`);

        console.log("callMaterialSpecAPI result : ", result);
        if (result.status === 200) {
            dispatch(getMaterialSpec(result));
        }
    };
};

export const callMaterialSpecDeleteAPI = ({specCode}) => {
    return async (dispatch, getState) => {


    };
};