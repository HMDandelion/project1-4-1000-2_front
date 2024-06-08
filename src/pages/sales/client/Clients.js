import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";

import ColumnsTable from "../../../components/table/ComplexTable";
import {Button, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
import ClientRegist from "./ClientRegist";
import PagingBar from "../../../components/common/PagingBar";
import SearchRadioButton from "../../../components/button/SearchRadioButton";
import SelectMenu from "../../../components/common/SelectMenu";
import {SearchIcon} from "@chakra-ui/icons";

function Clients() {
    const dispatch = useDispatch();
    const {clients, success} = useSelector(state => state.clientReducer);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callSalesClientsAPI({currentPage}));
    }, [currentPage, success]);

    // 검색 옵션
    const menuList = ['거래처명', '대표명'];
    const [selectedOption, setSelectedOption] = useState(menuList[0]);

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
    // const tableTitle = "거래처 관리";     // 테이블 제목
    const baseLink = "/sales/client";   // 상세조회 React 주소
    const idAccessor = "clientCode";     // id로 사용할 컬럼 지정

    return (
        <>
            {
                clients &&
                <>
                    <HStack spacing='10px'>
                        <SearchRadioButton isChecked={isChecked} setIsChecked={setIsChecked} text='주문 진행중'/>
                        <SelectMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} menuList={menuList}/>
                        <ClientRegist/>
                    </HStack>
                    <ColumnsTable columnsData={columns} tableData={clients.data}
                                  baseLink={baseLink} idAccessor={idAccessor}/>
                    <PagingBar pageInfo={clients.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Clients;