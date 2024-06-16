
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callDefectDetailAPI} from "../../../apis/ProductionAPICalls";
import {HStack, Spinner} from "@chakra-ui/react";
import ComplexTable from "../../../components/table/NewComplexTable";


function DefectDetail() {

    const dispatch = useDispatch();
    const {productionDetailCode} = useParams();
    const {defectDetails} = useSelector((state) => state.productionReportReducer)


    useEffect(() => {
        console.log('시작')
        dispatch(callDefectDetailAPI({ productionDetailCode:productionDetailCode }));
        if(defectDetails) {
            console.log('메가커피', defectDetails);
        }
    }, []);
    const columns = [

        { Header: "상세 정보 코드", accessor: "productionDetailCode" },
        { Header: "불량 코드", accessor: "defectCode" },
        { Header: "첨부 파일", accessor: "defectFile" },
        { Header: "불량 사유", accessor: "defectReason" },
        { Header: "처리 상태", accessor: "defectStatus" }

    ];

    return (
        <>
            {defectDetails ? ( // productionReport가 존재하면 ComplexTable을 렌더링하고, 아니면 로딩 표시를 보여줍니다.
                <HStack spacing="10px">
                    <ComplexTable columnsData={columns} tableData={defectDetails}  />
                </HStack>
            ) : (
                <Spinner size="xl" color="blue.500" /> // 로딩 표시
            )}
        </>
    );

}

export default DefectDetail;