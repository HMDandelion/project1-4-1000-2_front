import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Badge, HStack} from "@chakra-ui/react";
import PagingBar from "../../../components/common/PagingBar";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import {useNavigate} from "react-router-dom";
import {callEstimatesAPI} from "../../../apis/EstimateAPICalls";
import EstimateRegist from "./EstimateRegist";

function Estimates() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {estimates, success} = useSelector(state => state.estimateReducer);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callEstimatesAPI({currentPage}));
    }, [currentPage, success]);

    // 검색 옵션
    const menuList = ['거래처명'];
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
            Header: '등록일',
            accessor: 'createdAt'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '견적가',
            accessor: 'totalPrice'
        },
        {
            Header: '',
            accessor: 'isOrdered',
            Cell: (cell) => cell.value ?
                <Badge colorScheme='green' size='xs'>주문신청완료</Badge> :
                <Badge colorScheme='orange' size='xs'>견적접수</Badge>
        }
    ]

    const handleRowClick = (row) => {
        navigate(`/sales/estimate/detail`, {state: row.original.estimateCode});
    }

    return (
        <>
            {
                estimates &&
                <>
                    <HStack spacing='10px'>
                        <SelectMenu onSearch={handleSearch} menuList={menuList}/>
                        <EstimateRegist/>
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={estimates.data} onRowClick={handleRowClick}/>
                    <PagingBar pageInfo={estimates.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Estimates;