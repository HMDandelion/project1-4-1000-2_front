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


function PlanOrderDetail() {
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
            </Flex>
            <Divider mt='20px'/>
            <Card>
                <Text fontSize='2xl' fontWeight='800' color={textColor} m='10px'>
                    상품상세
                </Text>
                <AgGrid columnsData={columnData} tableData={order.orderProducts}/>
            </Card>
        </>
    );
}

export default PlanOrderDetail;