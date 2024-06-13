import {Badge, Button, Divider, Flex, Heading, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import SetMaterialOrderButton from "../../../components/button/SetMaterialOrderButton";
import {callMaterialSpecAPI, callMaterialSpecDeleteAPI} from "../../../apis/MaterialSpecAPICalls";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import Card from "../../../components/card/Card";
import AgGrid from "../../../components/table/AgGrid";
import {callClientDeleteAPI, callMaterialClientAPI} from "../../../apis/ClientAPICalls";
import ClientModify from "../../sales/client/ClientModify";
import {callMaterialOrderAPI} from "../../../apis/MaterialOrderAPICalls";

function MaterialOrderDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const location = useLocation();
    const orderCode = location.state;
    const { order } = useSelector(state => state.materialOrderReducer);
    const dispatch = useDispatch();

    const [columnData, setColumnData] = useState([
        { headerName: "코드", valueGetter: (p) => p.data.materialSpec.specCode, width: 100, resizable: false },
        { headerName: "자재명", valueGetter: (p) => p.data.materialSpec.materialName },
        { headerName: "분류", valueGetter: (p) => p.data.materialSpec.categoryName },
        { headerName: "수량", valueGetter: (p) => p.data.orderQuantity },
        { headerName: "단가", valueGetter: (p) => p.data.price },
        { headerName: "합산", valueGetter: (p) => p.data.orderQuantity * p.data.price }
    ]);


    useEffect(() => {
            dispatch(callMaterialOrderAPI({orderCode}));
        },[]
    );
    return (
        order &&
        <>
            <Text fontWeight='bold' color={textColor}> 연관된 생산계획 : {order.planName}</Text>
            <Flex justify='space-between'>
                <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                   주문 {orderCode} : {order.status}
                </Text>
                <div>
                    <Button colorScheme='gray' size='xs' onClick={onOpen}>
                        수정
                    </Button>
                    {/* <DeleteAlertButton code={clientCode} deleteAPI={callClientDeleteAPI}/> */}
                </div>
                {/* <ClientModify isOpen={isOpen} onClose={onClose} client={client}/> */}
            </Flex>

            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>주문일자</Badge><span>{order.orderDate}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>예상 배송일</Badge><span>{order.deliveryDueDate}</span
            ></Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>도착일</Badge><span>{order.arrivalDateTime}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>공급업체</Badge><span>{order.clientName}</span>
            </Text>
            <Divider mt='20px'/>

            <Card>
                <Heading fontSize='xl' color={textColor} pb='15px'>
                    <Flex justify='space-between'>
                        <span>주문 목록</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={order.orderSpecList}/>
            </Card>

        </>
    );
}
export default MaterialOrderDetail;