import {useEffect, useState} from "react";
import {useColorModeValue} from "@chakra-ui/react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callProductionReportAPI} from "../../../apis/ProductionAPICalls";

function ProductionReportDetail(){
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productionStatusCode } = useParams();


    useEffect(() => {
        dispatch(callProductionReportAPI(productionStatusCode));
    }, []);



    return(
        <>상세 페이지</>
    )
}

export default ProductionReportDetail;

