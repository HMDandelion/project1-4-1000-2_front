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

function MaterialClientDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const location = useLocation();
    const clientCode = location.state;
    const { client } = useSelector(state => state.clientReducer);
    const dispatch = useDispatch();

    const [columnData, setColumnData] = useState([
        { headerName: "코드", valueGetter: (p) => p.data.specCode, width: 100, resizable: false },
        { headerName: "자재명", valueGetter: (p) => p.data.materialName },
        { headerName: "분류", valueGetter: (p) => p.data.categoryName },
        { headerName: "안전재고 수량", valueGetter: (p) => p.data.safetyStock },
        { headerName: "세부스펙", valueGetter: (p) => p.data.specification },
        { headerName: "", cellRenderer: (p) => <SetMaterialOrderButton clientCode={clientCode} specCode={p.data.specCode}/>, width: 100, resizable: false}
    ]);


    useEffect(() => {
            dispatch(callMaterialClientAPI({clientCode}));
        },[]
    );
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
                        <span>담당 자재</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={client.materials}/>
            </Card>

        </>
    );
}
export default MaterialClientDetail;