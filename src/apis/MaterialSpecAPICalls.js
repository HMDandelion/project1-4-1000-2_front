import {authRequest} from "./api";
import {getMaterialSpec, getMaterialSpecs,success,deleted} from "../modules/MaterialSpecModules";
import {successDrop} from "../modules/MaterialStockDDModules";
import {statusToastAlert} from "../utils/ToastUtils";

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

export const callMaterialSpecDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            console.log(code);
            const result = await authRequest.delete(`api/v1/material/spec/${code}`);
            console.log("callMaterialSpecAPI result : ", result);
            if (result.status === 204) {
                dispatch(deleted(true));
            }
        } catch (e){
            statusToastAlert(e.response.data.code, e.response.data.message, 'error');
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

export const callMaterialCateCreateAPI = (text) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`api/v1/material/spec/category?newCategoryName=${text}`);

        console.log("callMaterialCateCreateAPI result : ", result);
        if (result.status === 201) {
            dispatch(successDrop(true));
        }

    };
};

export const callMaterialCateDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            console.log(code);
            const result = await authRequest.delete(`api/v1/material/spec/category?categoryCode=${code}`);

            console.log("callMaterialCateCreateAPI result : ", result);
            if (result.status === 204) {
                dispatch(successDrop(true));
            }
        }catch (e) {
            statusToastAlert(e.status, e.message, 'error');
        }

    };
};