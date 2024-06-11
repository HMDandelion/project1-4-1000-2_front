import {
    Text,
    Badge,
    useColorModeValue,
    Heading,
    Flex,
    Button,
    useDisclosure,
    Divider,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    Grid,
    GridItem,
    Box,
    AlertDialogHeader,
    AlertDialogBody, AlertDialogFooter,
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import ViewDetailButton from "../../../components/button/ViewDetailButton";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import {callEstimateAPI, callEstimateDeleteAPI} from "../../../apis/EstimateAPICalls";
import {WarningIcon} from "@chakra-ui/icons";
import OrderRegistButton from "../../../components/button/OrderRegistButton";
import EstimateModify from "./EstimateModify";


function EstimateDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const estimateCode = location.state;
    const { estimate, success, deleted } = useSelector(state => state.estimateReducer);
    const { orderSuccess } = useSelector(state => state.orderReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "상품번호", valueGetter: (p) => p.data.productCode, width: 100, resizable: false },
        { headerName: "상품명", valueGetter: (p) => p.data.productName },
        { headerName: "수량", valueGetter: (p) => p.data.quantity },
        { headerName: "단가", valueGetter: (p) => p.data.price },
        { headerName: "합계", valueGetter: (p) => p.data.quantity * p.data.price }
    ]);

    useEffect(() => {
        dispatch(callEstimateAPI({estimateCode}));
        onClose();
    }, [success]);

    useEffect(() => {
        if(deleted === true) navigate('/sales/estimate');
    }, [deleted]);

    useEffect(() => {
        if(orderSuccess === true) navigate('/sales/order');
    }, [orderSuccess]);

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.quantity * product.price), 0);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    return (
        estimate &&
        <>
            <Flex justify='space-between'>
                <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                    견적 상세
                </Text>
                <div>
                    <Button colorScheme='gray' size='xs' onClick={onOpen}>
                        수정
                    </Button>
                    <DeleteAlertButton code={estimateCode} deleteAPI={callEstimateDeleteAPI}/>
                </div>
                <EstimateModify isOpen={isOpen} onClose={onClose} estimate={estimate}/>
            </Flex>

            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>거래처</Badge><span>{estimate.clientName}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>희망 마감일자</Badge><span>{estimate.deadline}</span
            ></Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>최종 수정일자</Badge><span>{estimate.updatedAt}</span>
            </Text>
            <Divider mt='20px'/>

            <Card>
                <AgGrid columnsData={columnData} tableData={estimate.products}/>
                <Heading fontSize='xl' color={textColor} pt='15px'>
                    <Flex justify='space-between'>
                        <span>견적 총액 {formatNumber(getTotalPrice(estimate.products))}원</span>
                        <OrderRegistButton isPossible={!estimate['isOrdered']} estimateCode={estimate.estimateCode}/>
                    </Flex>
                </Heading>
            </Card>
        </>
    );
}

export default EstimateDetail;