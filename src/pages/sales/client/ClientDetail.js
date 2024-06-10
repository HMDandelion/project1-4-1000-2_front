import {
    Text,
    Badge,
    useColorModeValue,
    Heading,
    Flex,
    Button,
    useDisclosure, Divider,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callClientDeleteAPI, callSalesClientAPI} from "../../../apis/ClientAPICalls";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import ViewDetailButton from "../../../components/button/ViewDetailButton";
import OrderStatusBadge from "../../../components/badge/OrderStatusBadge";
import ClientModify from "./ClientModify";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";


function ClientDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const clientCode = location.state;
    const { client, success, deleted } = useSelector(state => state.clientReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "주문번호", valueGetter: (p) => p.data.orderCode, width: 100, resizable: false },
        { headerName: "주문일시", valueGetter: (p) => p.data.orderDatetime },
        { headerName: "마감기한", valueGetter: (p) => p.data.deadline },
        { headerName: "주문총액", valueGetter: (p) => p.data.totalPrice },
        { headerName: "진행상태", cellRenderer: (p) => OrderStatusBadge(p.data.status), width: 150 },
        { headerName: null, cellRenderer: (p) => ViewDetailButton(`/sales/orders/${p.data.orderCode}`), width: 100, resizable: false}
    ]);

    useEffect(() => {
        dispatch(callSalesClientAPI({clientCode}));
        onClose();
    }, [success]);

    useEffect(() => {
        if(deleted === true) navigate('/sales/client');
    }, [deleted]);


    const getTotalPrice = (orders) => {
        return orders.reduce((total, order) => total + order.totalPrice, 0);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    return (
        client &&
        <>
            <Flex justify='space-between'>
                <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                    {client.clientName}
                </Text>
                <div>
                    <Button colorScheme='gray' size='xs' onClick={onOpen}>
                        수정
                    </Button>
                    <DeleteAlertButton code={clientCode} deleteAPI={callClientDeleteAPI}/>
                </div>
                <ClientModify isOpen={isOpen} onClose={onClose} client={client}/>
            </Flex>

            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>대표명</Badge><span>{client.representativeName}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>연락처</Badge><span>{client.phone}</span
            ></Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>주소</Badge><span>{client.address} {client.addressDetail}</span>
            </Text>
            <Divider mt='20px'/>

            <Card>
                <Heading fontSize='xl' color={textColor} pb='15px'>
                    <Flex justify='space-between'>
                        <span>누적 주문내역</span>
                        <span>주문 총액 {formatNumber(getTotalPrice(client.orders))}원</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={client.orders}/>
            </Card>

        </>
    );
}

export default ClientDetail;