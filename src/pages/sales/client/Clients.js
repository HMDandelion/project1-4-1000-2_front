import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";

import ColumnsTable from "../../../components/table/ComplexTable";
import {Button, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
import ClientRegist from "./ClientRegist";
import PagingBar from "../../../components/common/PagingBar";
import SearchRadioButton from "../../../components/button/SearchRadioButton";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import {useNavigate} from "react-router-dom";

function Clients() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {clients, success} = useSelector(state => state.clientReducer);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callSalesClientsAPI({currentPage}));
    }, [currentPage, success]);

    // 검색 옵션
    const menuList = ['거래처명', '대표명'];
    const [searchParams, setSearchParams] = useState({
        selectedOption : menuList[0],
        searchText : '',
    });

    const handleSearch = (selectedOption, searchText) => {
        setSearchParams({ selectedOption, searchText });
    };

    // 필터 검색
    const [isChecked, setIsChecked] = useState(false);

    // 리액트 테이블 컬럼 데이터
    const columns = [
        {
            Header: '코드',
            accessor: 'clientCode'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '대표명',
            accessor: 'representativeName'
        },
        {
            Header: '연락처',
            accessor: 'phone'
        }
    ]

    const handleRowClick = (row) => {
        console.log("clicked row  : ", row);
        navigate(`/sales/client/detail`, {state: row.original.clientCode});
    }

    return (
        <>
            {
                clients &&
                <>
                    <HStack spacing='10px'>
                        <SearchRadioButton isChecked={isChecked} setIsChecked={setIsChecked} text='주문 진행중'/>
                        <SelectMenu onSearch={handleSearch} menuList={menuList}/>
                        <ClientRegist/>
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={clients.data} onRowClick={handleRowClick}/>
                    <PagingBar pageInfo={clients.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Clients;