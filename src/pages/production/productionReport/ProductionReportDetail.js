import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callProductionDetailAPI } from "../../../apis/ProductionAPICalls";
import { Flex, Center, Box, Spinner, Text } from "@chakra-ui/react";
import ComplexTable from "../../../components/table/NewComplexTable";

function ProductionReportDetail() {
    const dispatch = useDispatch();
    const { productionStatusCode } = useParams();
    const { productionReport } = useSelector((state) => state.productionReportReducer);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(productionStatusCode);
        dispatch(callProductionDetailAPI({ productionStatusCode }));
    }, [productionStatusCode, dispatch]);

    const columns = [
        { Header: <Text fontSize="sm">상세정보 코드</Text>, accessor: "productionDetailCode" },
        { Header: <Text fontSize="sm">업무 지시서 코드</Text>, accessor: "workOrderCode" },
        { Header: <Text fontSize="sm">라인</Text>, accessor: "lineName" },
        { Header: <Text fontSize="sm">담당자</Text>, accessor: "employeeName" },
        { Header: <Text fontSize="sm">생산 상품</Text>, accessor: "productName" },
        { Header: <Text fontSize="sm">지시 수량</Text>, accessor: "orderedQuantity" },
        { Header: <Text fontSize="sm">생산량</Text>, accessor: "productionQuantity" },
        { Header: <Text fontSize="sm">불량 수량</Text>, accessor: "defectQuantity" },
        { Header: <Text fontSize="sm">양품 수량</Text>, accessor: "completelyQuantity" },
        { Header: <Text fontSize="sm">검수 일시</Text>, accessor: "inspectionDate" },
        { Header: <Text fontSize="sm">검수 결과</Text>, accessor: "inspectionStatusType" },
        { Header: <Text fontSize="sm">비고</Text>, accessor: "productionMemo" },
        { Header: <Text fontSize="sm">생산 상태</Text>, accessor: "productionStatusType" },
    ];

    const handleRowClick = (row) => {
        navigate(`/production/reports/${row.original.productionDetailCode}/defects`);
    };

    return (
        <Flex direction="column" align="center" w="100%" p={5}>
            {productionReport ? (
                <Center w="100%">
                    <Box w="100%" overflowX="scroll">

                        <ComplexTable columnsData={columns} tableData={productionReport} onRowClick={handleRowClick} />
                    </Box>
                </Center>
            ) : (
                <Center w="100%" h="100vh">
                    <Spinner size="xl" color="blue.500" />
                </Center>
            )}
        </Flex>
    );
}

export default ProductionReportDetail;
