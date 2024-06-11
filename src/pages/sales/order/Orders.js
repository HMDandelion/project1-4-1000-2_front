import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Badge, HStack, Text} from "@chakra-ui/react";
import PagingBar from "../../../components/common/PagingBar";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import {useNavigate} from "react-router-dom";
import OrderStatusBadge from "../../../components/badge/OrderStatusBadge";
import {callOrdersAPI} from "../../../apis/OrderAPICalls";

function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {orders, success} = useSelector(state => state.orderReducer);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callOrdersAPI({currentPage}));
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
            Header: '코드',
            accessor: 'orderCode'
        },
        {
            Header: '주문일자',
            accessor: 'orderDatetime'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '주문상태',
            accessor: 'status',
            Cell: (cell) => OrderStatusBadge(cell.value)
        },
        {
            Header: '마감일자',
            accessor: 'deadline'
        },
        {
            Header: '남은 일자',
            accessor: 'daysLeft',
            Cell: ({row}) => {
                const deadlineDate = new Date(row.original.deadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                return (
                    daysLeft > 0 ?
                        <Text color={daysLeft < 3 ? 'red' : ''}>{daysLeft}일</Text> :
                        <Text>마감</Text>
                );
            }
        }
    ]

    const handleRowClick = (row) => {
        navigate(`/sales/order/detail`, {state: row.original.orderCode});
    }

    return (
        <>
            {
                orders &&
                <>
                    <HStack spacing='10px'>
                        <SelectMenu onSearch={handleSearch} menuList={menuList}/>
                    </HStack>
                    <ComplexTable columnsData={columns} tableData={orders.data} onRowClick={handleRowClick}/>
                    <PagingBar pageInfo={orders.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>

    );
}

export default Orders;