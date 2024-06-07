import {
    Text,
    Badge,
    useColorModeValue,
    Heading,
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton, ModalBody, ModalFooter
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callSalesClientAPI} from "../../../apis/ClientAPICalls";
import {useParams} from "react-router-dom";
import HorizonLine from "../../../components/common/HorizonLine";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import ViewDetailButton from "../../../components/button/ViewDetailButton";
import OrderStatusButton from "../../../components/button/OrderStatusButton";
import ClientRegist from "./ClientRegist";


function ClientDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();
    const { clientCode } = useParams();
    const { client } = useSelector(state => state.clientReducer);


    const [columnData, setColumnData] = useState([
        { headerName: "주문번호", valueGetter: (p) => p.data.orderCode, width: 100, resizable: false },
        { headerName: "주문일시", valueGetter: (p) => p.data.orderDatetime },
        { headerName: "마감기한", valueGetter: (p) => p.data.deadline },
        { headerName: "주문총액", valueGetter: (p) => p.data.totalPrice },
        { headerName: "진행상태", cellRenderer: OrderStatusButton },
        { headerName: null, cellRenderer: (p) => ViewDetailButton(`/sales/orders/${p.data.orderCode}`), width: 100, resizable: false}
    ]);

    useEffect(() => {
        dispatch(callSalesClientAPI({clientCode}));
    }, []);

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
                <Button colorScheme='gray' size='xs' onClick={onOpen}>
                    수정
                </Button>
                <ClientRegist isOpen={isOpen} onClose={onClose}/>

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
            <HorizonLine/>

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