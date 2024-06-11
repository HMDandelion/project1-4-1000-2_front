import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callProductionDetailAPI } from "../../../apis/ProductionAPICalls";
import { HStack, Spinner } from "@chakra-ui/react"; // 로딩 표시를 위해 Spinner 추가
import ComplexTable from "../../../components/table/NewComplexTable";

function ProductionReportDetail() {
    const dispatch = useDispatch();
    const { productionStatusCode } = useParams();
    const { productionReport } = useSelector(
        (state) => state.productionReportReducer
    );

    const navigate = useNavigate();



    useEffect(() => {
        console.log(productionStatusCode);
        dispatch(callProductionDetailAPI({ productionStatusCode }));
    }, [productionStatusCode]);

    const columns = [

        { Header: "상세정보 코드", accessor: "productionDetailCode" },
        { Header: "업무 지시서 코드", accessor: "workOrderCode" },
        { Header: "생산량", accessor: "productionQuantity" },
        { Header: "불량 수량", accessor: "defectQuantity" },
        { Header: "양품 수량", accessor: "completelyQuantity" },
        { Header: "검수 일시", accessor: "inspectionDate" },
        { Header: "검수 결과", accessor: "inspectionStatusType" },
        { Header: "비고", accessor: "productionMemo" },
        { Header: "생산 상태", accessor: "productionStatusType" },
    ];

    const handleRowClick = (row) => {
        // navigate(`/production/report/detail`, { state: row.original.productionStatusCode });
        navigate(`/production/reports/${row.original.productionDetailCode}/defects`);
    };

    return (
        <>
            {productionReport ? ( // productionReport가 존재하면 ComplexTable을 렌더링하고, 아니면 로딩 표시를 보여줍니다.
                <HStack spacing="10px">
                    <ComplexTable columnsData={columns} tableData={productionReport} onRowClick={handleRowClick} />
                </HStack>
            ) : (
                <Spinner size="xl" color="blue.500" /> // 로딩 표시
            )}
        </>
    );
}
export default ProductionReportDetail;
