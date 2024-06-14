import { useDispatch, useSelector } from "react-redux";
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
    callProductionReportDeleteAPI,
    callProductionReportsAPI,
    deleteProductionReportAPI
} from "../../../apis/ProductionAPICalls";
import { Button, HStack, Flex, Center, useDisclosure, Checkbox } from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import DropDownMenu from "../../../components/common/DropDownMenu";
import { useNavigate } from "react-router-dom";
import PagingBar from "../../../components/common/PagingBar";

const RegistProductionReportModal = lazy(() => import("./ProductionReportRegist"));

function ProductionReports() {
    const dispatch = useDispatch();
    const { productionReports } = useSelector((state) => state.productionReportReducer);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [statusType, setStatusType] = useState('type1');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReports, setSelectedReports] = useState([]);

    useEffect(() => {
        dispatch(callProductionReportsAPI({ currentPage }));
    }, [currentPage, statusType, dispatch]);

    const searchHandler = (selectedOption, selectedLabel) => {
        if (selectedOption === '상태') {
            setStatusType(selectedLabel);
        }
    };

    const searchOptions = {
        type1: ['PRODUCTION_COMPLETED', 'ADDITIONAL_PRODUCTION', 'PRODUCTION_HOLD', 'REGISTER_PRODUCTION', 'WAIT']
    };

    const menuList = searchOptions[statusType];

    const columns = [
        {
            Header: '선택',
            accessor: 'select',
            Cell: ({ row }) => (
                <Checkbox
                    isChecked={selectedReports.includes(row.original.productionStatusCode)}
                    onChange={(e) => handleSelectReport(e, row.original.productionStatusCode)}
                />
            )
        },
        { Header: '코드', accessor: 'productionStatusCode' },
        { Header: '생산 상품', accessor: 'stylizationName' },
        { Header: '총 지시 수량', accessor: 'totalOrderedQuantity' },
        { Header: '총 생산량', accessor: 'totalProductionQuantity' },
        { Header: '생산 시작 일자', accessor: 'startAt' },
        { Header: '생산 마감 일시', accessor: 'completedAt' },
        { Header: '첨부 파일', accessor: 'productionFile' },
        { Header: '상태', accessor: 'productionStatus' }
    ];

    const handleRowClick = (row) => {
        navigate(`/production/reports/${row.original.productionStatusCode}/detail`);
    };

    const handleAddReport = () => {
        onOpen();
    };

    const handleDeleteReport = () => {
        selectedReports.forEach((reportId) => {
            dispatch(callProductionReportDeleteAPI(reportId));
        });
        setSelectedReports([]);
        dispatch(callProductionReportsAPI({ currentPage }));
    };

    const handleSelectReport = (e, reportId) => {
        if (e.target.checked) {
            setSelectedReports([...selectedReports, reportId]);
        } else {
            setSelectedReports(selectedReports.filter((id) => id !== reportId));
        }
    };

    return (
        productionReports &&
        <Flex direction="column" align="center" w="100%">
            <HStack justifyContent="space-between" mb="20px" w="100%">
                <HStack spacing="10px">
                    <DropDownMenu dropDownList={searchOptions.type1} setValue={searchHandler} mr="20px" />
                    <SelectMenu onSearch={searchHandler} menuList={menuList} />
                </HStack>
                <HStack size="sm">
                    <Button colorScheme="orange" onClick={handleAddReport}>등록</Button>
                    <Button colorScheme="red" onClick={handleDeleteReport} isDisabled={selectedReports.length === 0}>삭제</Button>
                </HStack>
            </HStack>
            <Center w="100%">
                {productionReports && (
                    <ComplexTable columnsData={columns} tableData={productionReports.data} onRowClick={handleRowClick} />
                )}
            </Center>
            <Center w="100%" mt="20px">
                <PagingBar pageInfo={productionReports.pageInfo} setCurrentPage={setCurrentPage} />
            </Center>
            <Suspense fallback={<div>Loading...</div>}>
                <RegistProductionReportModal isOpen={isOpen} onClose={onClose} />
            </Suspense>
        </Flex>
    );
}

export default ProductionReports;
