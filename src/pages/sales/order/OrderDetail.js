import {
    Text,
    Badge,
    useColorModeValue,
    Heading,
    Flex,
    Button,
    useDisclosure,
    Divider
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import {callEstimateAPI} from "../../../apis/EstimateAPICalls";
import {callOrderAPI} from "../../../apis/OrderAPICalls";


function OrderDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const orderCode = location.state;
    const { order, success } = useSelector(state => state.orderReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "상품번호", valueGetter: (p) => p.data.productCode, width: 100, resizable: false },
        { headerName: "상품명", valueGetter: (p) => p.data.productName },
        { headerName: "수량", valueGetter: (p) => p.data.quantity },
        { headerName: "단가", valueGetter: (p) => p.data.price },
        { headerName: "합계", valueGetter: (p) => p.data.quantity * p.data.price }
    ]);

    useEffect(() => {
        dispatch(callOrderAPI({orderCode}));
        onClose();
    }, [success]);
    //
    // useEffect(() => {
    //     if(deleted === true) navigate('/sales/order');
    // }, [deleted]);

    // useEffect(() => {
    //     if(orderSuccess === true) navigate('/sales/order');
    // }, [orderSuccess]);

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.quantity * product.price), 0);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    return (
        order &&
        <>
            <Flex justify='space-between'>
                <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                    주문 상세
                </Text>
                <div>
                    <Button colorScheme='gray' size='xs' onClick={onOpen}>
                        수정
                    </Button>
                    <DeleteAlertButton/>
                </div>
            </Flex>


            <Divider mt='20px'/>

            <Card>
                <AgGrid columnsData={columnData} tableData={order.orderProducts}/>
                <Heading fontSize='xl' color={textColor} pt='15px'>
                    <Flex justify='space-between'>
                        <span>주문 총액 {formatNumber(getTotalPrice(order.orderProducts))}원</span>
                        {/*<OrderRegistButton isPossible={!estimate['isOrdered']} estimateCode={estimate.estimateCode}/>*/}
                    </Flex>
                </Heading>
            </Card>
        </>
    );
}

export default OrderDetail;