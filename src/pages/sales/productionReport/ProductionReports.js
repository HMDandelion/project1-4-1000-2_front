import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callProductionReportsAPI } from "../../../apis/ProductionAPICalls";
import productionReportReducer from "../../../modules/ProductionReportModules";
import { HStack } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import PagingBar from "../../../components/common/PagingBar";
import DropDownMenu from "../../../components/common/DropDownMenu";

function ProductionReports() {
    const dispatch = useDispatch();
    const { productionReports } = useSelector(
        state => state, productionReportReducer);

    /* 페이지 */
    const [currentPage, setCurrentPage] = useState(1);
    const [statusType, setStatusType] = useState('type1'); // 상태 값 추가

    useEffect(() => {
        dispatch(callProductionReportsAPI({ currentPage, statusType })); // API 호출 시 상태 값도 함께 전달
    }, [currentPage, statusType]);

    // 검색 핸들러
    const searchHandler = (selectedOption, selectedLabel) => {
        // 검색 옵션에 따라 상태 값을 설정
        if (selectedOption === '상태') {
            setStatusType(selectedLabel);
        }
    };

    // 검색 옵션
    const searchOptions = {
        type1: ['PRODUCTION_COMPLETED', 'ADDITIONAL_PRODUCTION', 'PRODUCTION_HOLD', 'REGISTER_PRODUCTION', 'WAIT']
    };
    const menuList = searchOptions[statusType];

    /* 리엑트 테이블 컬럼 데이터 */
    const columns = [
        {
            Header: '코드',
            accessor: 'productionStatusCode'
        },
        {
            Header: '생산 시작 일자',
            accessor: 'startAt'
        },
        {
            Header: '생산 마감 일시',
            accessor: 'completedAt'
        },
        {
            Header: '총 생산량',
            accessor: 'totalProductionQuantity'
        },
        {
            Header: '첨부 파일',
            accessor: 'productionFile'
        },
        {
            Header: '상태',
            accessor: 'productionStatus'
        }
    ];

    return (
        <>
            {
                productionReports &&
                <>
                    <HStack spacing='10px'>
                        {/* 드롭다운 메뉴에서 상태 값 선택 */}
                        <DropDownMenu dropDownList={searchOptions.type1} setValue={searchHandler} mr="20px" />
                        <SelectMenu onSearch={searchHandler} menuList={menuList} />
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={productionReports.data} />
                    <PagingBar pageInfo={productionReports.pageInfo} setCurrentPage={setCurrentPage} />
                </>
            }
        </>
    );
}

export default ProductionReports;
