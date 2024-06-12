import {authRequest} from "./api";
import {getMaterialSpec, getMaterialSpecs,success} from "../modules/MaterialSpecModules";

export const callMaterialSpecsAPI = ({currentPage = 1, searchParams}) => {
    return async (dispatch, getState) => {
        let url = `/api/v1/material/spec?page= ${currentPage}`;
        if (searchParams.searchText) {
            url = url + `&materialName=${searchParams.searchText}`;
        }
        const result = await authRequest.get(url);

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
        const result = await authRequest.delete(`api/v1/material/spec/`, specCode);
        console.log("callMaterialSpecAPI result : ", result);
        if (result.status === 204) {
            dispatch(success(true));
        }
    };
};

export const callMaterialSpecRegistAPI = ({specRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/api/v1/material/spec`, specRequest);

        console.log("callMaterialSpecRegistAPI result : ", result);

        if (result.status === 201) {
            dispatch(success(true));
        }

    };
};

export const callMaterialSpecModifyAPI = ({specCode,specRequest}) => {
    return async (dispatch, getState) => {
        const combineRequest = {
            ...specRequest,
            specCode: specCode
        }
        const result = await authRequest.put(`/api/v1/material/spec`, combineRequest);
        console.log("callMaterialSpecModifyAPI result : ", result);

        if (result.status === 201) {
            dispatch(success(true));
        }
    };
};