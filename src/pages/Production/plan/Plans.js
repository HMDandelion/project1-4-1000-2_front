import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import PagingBar from "../../../components/common/PagingBar";
import ComplexTable from "../../../components/table/NewComplexTable";
import PlanRegist from "./PlanRegist";
import PlanOrderDetail from "./PlanOrderDetail";
import { AddIcon, InfoOutlineIcon, MinusIcon } from "@chakra-ui/icons";
import { callPlanningOrdersAPI } from "../../../apis/OrderAPICalls";

function Plans() {
    const dispatch = useDispatch();
    const { planningOrder, success } = useSelector(state => state.planningOrderReducer);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(callPlanningOrdersAPI({ currentPage }));
    }, [currentPage, success]);

    const handleToggleProduct = (product) => {
        const index = selectedProducts.findIndex(p => p.orderCode === product.orderCode && p.productCode === product.productCode);
        if (index !== -1) {
            setSelectedProducts(prevProducts => prevProducts.filter(p => p.orderCode !== product.orderCode || p.productCode !== product.productCode));
        } else {
            setSelectedProducts(prevProducts => [...prevProducts, { ...product }]);
        }
    };

    const columns = [
        {
            Header: '',
            accessor: 'orderCode',
            Cell: ({ row }) => (
                <IconButton
                    icon={selectedProducts.some(p => p.orderCode === row.original.orderCode && p.productCode === row.original.productCode) ? <MinusIcon /> : <AddIcon />}
                    size="sm"
                    color={selectedProducts.some(p => p.orderCode === row.original.orderCode && p.productCode === row.original.productCode) ? 'red' : 'green'}
                    onClick={() => handleToggleProduct(row.original)}
                />
            )
        },
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
                <IconButton
                    icon={<InfoOutlineIcon />}
                    size="sm"
                    onClick={() => setSelectedOrder(row.original)}
                />
            )
        }
    ];

    return (
        <>
            {planningOrder && (
                <div>
                    <Flex>
                        <Box flex="1">
                            <ComplexTable columnsData={columns} tableData={planningOrder.data} onRowClick={() => {}} />
                        </Box>
                        <Box flex="1">
                            <PlanOrderDetail selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
                        </Box>
                    </Flex>
                    <PagingBar pageInfo={planningOrder.pageInfo} setCurrentPage={setCurrentPage} />
                    <PlanRegist selectedProducts={selectedProducts} />
                </div>
            )}
        </>
    );
}

export default Plans;
