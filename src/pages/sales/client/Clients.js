import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callSalesClientsAPI} from "../../../apis/ClientAPICalls";
import Card from "../../../components/card/Card";
import {Box, Grid} from "@chakra-ui/react";
import ColumnsTable from "../../../components/table/ComplexTable";

function Clients() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {clients} = useSelector(state => state.clientReducer);

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

    useEffect(() => {
        dispatch(callSalesClientsAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            {
                clients &&
                <>
                    <ColumnsTable columnsData={columns} tableData={clients.data}/>
                </>
            }
        </>


    );
}

export default Clients;