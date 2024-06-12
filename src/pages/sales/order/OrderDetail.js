import {
    Text,
    Badge,
    useColorModeValue,
    Heading,
    Flex,
    useDisclosure,
    Divider, GridItem, Center, Grid, VStack
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import {callOrderAPI} from "../../../apis/OrderAPICalls";
import OrderStatusProgress from "./OrderStatusProgress";



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

    const getDayLeft = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        return (
            <Text color={daysLeft < 3 ? 'red' : ''}>{daysLeft < 0 ? 0 : daysLeft} 일</Text>
        );
    }

    return (
        order &&
        <>
            <Grid templateColumns='repeat(15, 1fr)'>
                <GridItem colSpan={7}>
                    <VStack
                        spacing={2}
                        align='stretch'
                    >
                        <Flex justify='space-between'>
                            <Text fontSize='xl' fontWeight='800' color={textColor} m='10px'>
                                주문 상세
                            </Text>
                            <Text fontSize='sm' fontWeight='600' color={textColor} mt='15px' mr='10px'>
                                주문번호 : {order.orderCode}
                            </Text>
                        </Flex>
                        <Divider/>
                        <OrderStatusProgress/>
                        <Flex justify='space-between'>
                            <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>
                                주문일자
                            </Text>
                            <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>
                                {order.orderDatetime}
                            </Text>
                        </Flex>
                        <Flex justify='space-between'>
                            <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>
                                마감일자
                            </Text>
                            <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>
                                {order.deadline}
                            </Text>
                        </Flex>
                        <Flex justify='flex-end'>
                            {
                                order.status === 'COMPLETED' ?
                                    <>
                                        <Badge fontSize='md' fontWeight='700' colorScheme='green' my='8px'>
                                            👏 완료일시
                                        </Badge>
                                        <Text fontSize='md' fontWeight='500' color={textColor} m='10px'>
                                            {order.completedAt}
                                        </Text>
                                    </> :
                                    <>
                                        <Text fontSize='md' fontWeight='700' color={textColor} m='10px'>
                                            마감까지
                                        </Text>
                                        <Text fontSize='md' fontWeight='500' color='orange.600' m='10px'>
                                            {getDayLeft(order.deadline)}
                                        </Text>
                                    </>
                            }
                        </Flex>
                    </VStack>
                </GridItem>
                <GridItem >
                    <Center height='260px'>
                        <Divider orientation='vertical'/>
                    </Center>
                </GridItem>
                <GridItem colSpan={7}>
                    <VStack
                        align='stretch'
                    >
                        <Flex>
                            <Text fontSize='xl' fontWeight='800' color={textColor} m='10px'>거래처 상세</Text>
                        </Flex>
                        <Divider/>
                        <Flex>
                            <Text fontSize='xl' fontWeight='700' color={textColor} m='10px'>{order.client.clientName}</Text>
                        </Flex>
                        <Flex justify='space-between'>
                            <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>대표명</Text>
                            <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{order.client.representativeName}</Text>
                        </Flex>
                        <Flex justify='space-between'>
                            <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>연락처</Text>
                            <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{order.client.phone}</Text>
                        </Flex>
                        <Flex justify='space-between'>
                            <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>주소</Text>
                            <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{order.client.address}{order.client.addressDetail}</Text>
                        </Flex>
                    </VStack>
                </GridItem>
            </Grid>




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