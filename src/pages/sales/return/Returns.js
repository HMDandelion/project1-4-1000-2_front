import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Badge, HStack} from "@chakra-ui/react";
import PagingBar from "../../../components/common/PagingBar";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import {useNavigate} from "react-router-dom";
import {callReturnsAPI} from "../../../apis/ReturnAPICalls";
import ManageStatusBadge from "../../../components/badge/ManageStatusBadge";
import ReturnStatusBadge from "../../../components/badge/ReturnStatusBadge";

function Returns() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {returns, success} = useSelector(state => state.returnReducer);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callReturnsAPI({currentPage}));
    }, [currentPage, success]);

    // 검색 옵션
    const menuList = ['상품명', '거래처명'];
    const [searchParams, setSearchParams] = useState({
        selectedOption : menuList[0],
        searchText : '',
    });

    const handleSearch = (selectedOption, searchText) => {
        setSearchParams({ selectedOption, searchText });
    };

    // 리액트 테이블 컬럼 데이터
    const columns = [
        {
            Header: '반품코드',
            accessor: 'returnCode'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '반품신청일자',
            accessor: 'returnDatetime'
        },
        {
            Header: '처리유형',
            accessor: 'manageType',
            Cell: (cell) => (cell.value) === 'EXCHANGE' ?
                <Badge colorScheme='gray' size='xs'>교환</Badge> :
                <Badge colorScheme='black' size='xs'>환불</Badge>
        },
        {
            Header: '진행상태',
            accessor: 'manageStatus',
            Cell: (cell) => ManageStatusBadge(cell.value)
        },
        {
            Header: '반품재고처리',
            accessor: 'returnStatus',
            Cell: (cell) => ReturnStatusBadge(cell.value)
        }
    ]

    const handleRowClick = (row) => {
        navigate(`/sales/return/detail`, {state: row.original.returnCode});
    }

    return (
        <>
            {
                returns &&
                <>
                    <HStack spacing='10px'>
                        <SelectMenu onSearch={handleSearch} menuList={menuList}/>
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={returns.data} onRowClick={handleRowClick}/>
                    <PagingBar pageInfo={returns.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Returns;