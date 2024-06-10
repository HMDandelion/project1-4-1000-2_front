// import {authRequest} from "./api";
//
// export const productionAPICalls = ({currentPage}) => {
//     return async (dispatch, getState) => {
//         const result = await authRequest.get(`api/vi/production-items?page=${currentPage}`)
//
//         console.log("callProductionItemsAPI result : ", result);
//         if (result.status === 200){
//             dispatch(getProductionItems(result));
//         }
//     }
// }