import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Badge, Box, Flex, HStack, Text} from "@chakra-ui/react";
import PagingBar from "../../../components/common/PagingBar";
import SelectMenu from "../../../components/common/SelectMenu";
import ComplexTable from "../../../components/table/NewComplexTable";
import {useNavigate} from "react-router-dom";
import OrderStatusBadge from "../../../components/badge/OrderStatusBadge";
import {callOrdersAPI} from "../../../apis/OrderAPICalls";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import {callWorkOrderDeleteAPI} from "../../../apis/WorkOrderAPICalls";
import ViewDetailButton from "../../../components/button/ViewDetailButton";
import PlanRegist from "./PlanRegist";
import PlanOrderDetail from "./PlanOrderDetail";

function Plans() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {orders, success} = useSelector(state => state.orderReducer);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callOrdersAPI({currentPage}));
    }, [currentPage, success]);

    // 리액트 테이블 컬럼 데이터
    const columns = [
        {
            Header: '주문일자',
            accessor: 'orderDatetime'
        },
        {
            Header: '마감일자',
            accessor: 'deadline'
        },
        {
            Header: '거래처명',
            accessor: 'clientName'
        },
        {
            Header: '상세보기',
            accessor: '',
            Cell: ({ row }) => (
                <ViewDetailButton
                    code={row.original.orderCode}
                    onUpdateOrderCode={setSelectedOrder} // 선택된 주문 코드 업데이트
                />
            )
        }
    ]
    const handleRowClick = (row) => {
        setSelectedOrder(row.original.orderCode); // 선택된 주문 코드 저장
    };

    return (
        <>
            {
                orders &&
                <div>
                    <Flex>
                        <Box>
                            <ComplexTable columnsData={columns} tableData={orders.data} onRowClick={() => { }}/>
                        </Box>
                        {selectedOrder && (
                            <Box flex="1">
                                <PlanOrderDetail orderCode={selectedOrder} />
                            </Box>
                        )}
                    </Flex>
                        <PagingBar pageInfo={orders.pageInfo} setCurrentPage={setCurrentPage}/>
                        <PlanRegist/>
                </div>

            }
        </>

    );
}

export default Plans;