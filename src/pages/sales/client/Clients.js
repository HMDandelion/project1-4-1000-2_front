import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";

import ColumnsTable from "../../../components/table/ComplexTable";
import {Button, Flex, useDisclosure} from "@chakra-ui/react";
import ClientRegist from "./ClientRegist";
import {useNavigate} from "react-router-dom";
import PagingBar from "../../../components/common/PagingBar";

function Clients() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {clients, success} = useSelector(state => state.clientReducer);


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

    const tableTitle = "거래처 관리";     // 테이블 제목
    const baseLink = "/sales/client";   // 상세조회 React 주소
    const idAccessor = "clientCode";     // id로 사용할 컬럼 지정

    useEffect(() => {
        dispatch(callSalesClientsAPI({currentPage}));
        onClose();
    }, [currentPage, success]);

    return (
        <>
            {
                clients &&
                <>
                    <ClientRegist isOpen={isOpen} onClose={onClose}/>
                    <ColumnsTable columnsData={columns} tableData={clients.data} tableTitle={tableTitle}
                                  baseLink={baseLink} idAccessor={idAccessor} onOpen={onOpen}/>
                    <PagingBar pageInfo={clients.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Clients;