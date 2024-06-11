import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { callProductionReportsAPI } from "../../../apis/ProductionAPICalls";
import { HStack } from "@chakra-ui/react";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import DropDownMenu from "../../../components/common/DropDownMenu";
import { useNavigate } from "react-router-dom";

function ProductionReports() {
    const dispatch = useDispatch();
    const { productionReports } = useSelector((state) => state.productionReportReducer);
    const navigate = useNavigate();

    const [statusType, setStatusType] = useState('type1');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callProductionReportsAPI({ currentPage, statusType }));
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
        { Header: '코드', accessor: 'productionStatusCode' },
        { Header: '총 생산량', accessor: 'totalProductionQuantity' },
        { Header: '생산 시작 일자', accessor: 'startAt' },
        { Header: '생산 마감 일시', accessor: 'completedAt' },
        { Header: '첨부 파일', accessor: 'productionFile' },
        { Header: '상태', accessor: 'productionStatus' }
    ];

    const handleRowClick = (row) => {
        // navigate(`/production/report/detail`, { state: row.original.productionStatusCode });
        navigate(`/production/reports/${row.original.productionStatusCode}`);
    };

    return (
        <>
            {productionReports && (
                <>
                    <HStack spacing='10px'>
                        <DropDownMenu dropDownList={searchOptions.type1} setValue={searchHandler} mr="20px" />
                        <SelectMenu onSearch={searchHandler} menuList={menuList} />
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={productionReports} onRowClick={handleRowClick} />

                </>
            )}
        </>
    );
}

export default ProductionReports;
