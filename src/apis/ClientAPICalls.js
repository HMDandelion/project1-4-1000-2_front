import {authRequest} from "./api";
import {
    deleted,
    getMaterialClient,
    getMaterialClients,
    getSalesClient,
    getSalesClients, getSimpleSalesClients,
    success
} from "../modules/ClientModules";
import {statusToastAlert} from "../utils/ToastUtils";

export const callSimpleSalesClientsAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/clients/simple`);
        console.log("callSimpleSalesClientsAPI result : ", result);
        if(result.status === 200) {
            dispatch(getSimpleSalesClients(result));
        }
    }
}

export const callSalesClientsAPI = ({currentPage = 1, searchParams, isOrdered}) => {
    return async (dispatch, getState) => {
        let queryString = searchParams.searchText ? `&${searchParams.selectedOption}=${searchParams.searchText}` : '';
        queryString += isOrdered ? `&isOrdered=true` : '';

        const result = await authRequest.get(`/api/v1/clients?page=${currentPage}${queryString}`);

        console.log("callSalesClientsAPI result : ", result);
        if(result.status === 200) {
            dispatch(getSalesClients(result));
        }
    }
}

export const callSalesClientAPI = ({ clientCode }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/api/v1/clients/${clientCode}`);

            console.log("callSalesClientAPI result : ", result);
            if(result.status === 200) {
                dispatch(getSalesClient(result));
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callClientRegistAPI = ({clientRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/api/v1/clients`, clientRequest);
            console.log("callClientRegistAPI result : ", result);

            if(result.status === 201) {
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callClientModifyAPI = ({clientCode, clientRequest}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/api/v1/clients/${clientCode}`, clientRequest);
            console.log("callClientModifyAPI result : ", result);

            if(result.status === 201) {
                dispatch(success());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

export const callClientDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.delete(`/api/v1/clients/${code}`);
            console.log("callClientDeleteAPI result : ", result);

            if(result.status === 204) {
                const title = '성공적으로 처리되었어요.';
                statusToastAlert(title, null, 'success');
                dispatch(deleted());
            }
        } catch ({response}) {
            const title = '문제가 발생했어요.';
            const desc = `${response.data.code} : ${response.data.message}`
            statusToastAlert(title, desc, 'error');
        }
    }
}

//이하 원자재 공급업체=================================================================================================

export const callMaterialClientsAPI = ({currentPage}) =>{
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/material/clients?page=${currentPage}`);
        console.log("callMaterialClientsAPI result : ", result);

        if (result.status === 200) {
            dispatch(getMaterialClients(result));
        }
    };
}
export const callMaterialClientAPI = ({clientCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/material/clients/${clientCode}`);
        console.log("callMaterialClientAPI result : ", result);

        if (result.status === 200) {
            dispatch(getMaterialClient(result));
        }
    };
};
export const callMaterialClientRegistAPI = ({materialClientCreateRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post('api/v1/material/clients',materialClientCreateRequest)

        if (result.status === 201) {
            dispatch(success());
        }
    };
};

export const callMaterialClientModifyAPI = ({clientCode,clientRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put(`api/v1/material/clients/${clientCode}`, clientRequest);

        if (result.status === 201) {
            dispatch(success());
        }

    };
};
export const callMaterialClientDeleteAPI = ({code}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.delete(`api/v1/material/clients?clientCode=${code}`);

        if (result.status === 204) {
            dispatch(deleted());
        }

    };
};

export const callSimpleMaterialClientsAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`api/v1/material/clients?page=1&size=1000`);
        console.log("callSimpleMaterialClientsAPI result : ", result);

        if (result.status === 200) {
            dispatch(getSimpleSalesClients(result));
        }

    };
};