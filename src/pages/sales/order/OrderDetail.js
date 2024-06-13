import {
    useColorModeValue,
    Heading,
    Flex,
    Divider, GridItem, Center, Grid
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import {callOrderAPI, callOrderCancelAPI} from "../../../apis/OrderAPICalls";
import OrderCancelButton from "../../../components/button/OrderCancelButton";
import ReturnRegist from "./ReturnRegist";
import OrderProgressDetail from "./OrderProgressDetail";
import OrderClientDetail from "./OrderClientDetail";



function OrderDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const orderCode = location.state;
    const { order, success, canceled } = useSelector(state => state.orderReducer);
    const { returnSuccess } = useSelector(state => state.returnReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "상품번호", valueGetter: (p) => p.data.productCode, width: 100, resizable: false },
        { headerName: "상품명", valueGetter: (p) => p.data.productName },
        { headerName: "수량", valueGetter: (p) => p.data.quantity },
        { headerName: "단가", valueGetter: (p) => p.data.price },
        { headerName: "합계", valueGetter: (p) => p.data.quantity * p.data.price }
    ]);

    useEffect(() => {
        dispatch(callOrderAPI({orderCode}));
    }, [success]);

    useEffect(() => {
        if(canceled === true) navigate('/sales/order');
    }, [canceled]);

    useEffect(() => {
        if(returnSuccess === true) navigate('/sales/return');
    }, [returnSuccess]);

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.quantity * product.price), 0);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    return (
        order &&
        <>
            <Grid templateColumns='repeat(15, 1fr)'>
                <GridItem colSpan={7}>
                    <OrderProgressDetail type='order' order={order}/>
                </GridItem>
                <GridItem >
                    <Center height='260px'>
                        <Divider orientation='vertical'/>
                    </Center>
                </GridItem>
                <GridItem colSpan={7}>
                    <OrderClientDetail client={order.client}/>
                </GridItem>
            </Grid>

            <Divider mt='20px'/>

            <Card>
                <AgGrid columnsData={columnData} tableData={order.orderProducts}/>
                <Heading fontSize='xl' color={textColor} pt='15px'>
                    <Flex justify='space-between'>
                        <span>주문 총액 {formatNumber(getTotalPrice(order.orderProducts))}원</span>
                        {
                            order.status !== 'COMPLETED' ?
                                <OrderCancelButton isPossible={order.status === 'ORDER_RECEIVED'}
                                                   cancelAPI={callOrderCancelAPI} code={order.orderCode}/> :
                                <ReturnRegist order={order}/>
                        }
                    </Flex>
                </Heading>
            </Card>
        </>
    );
}

export default OrderDetail;