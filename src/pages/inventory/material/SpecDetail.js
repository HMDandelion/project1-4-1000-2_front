import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callMaterialSpecAPI, callMaterialSpecDeleteAPI} from "../../../apis/MaterialSpecAPICalls";
import {Badge, Button, Flex, Heading, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import SetMaterialOrderButton from "../../../components/button/SetMaterialOrderButton";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import SpecModify from "../../../modals/Material/SpecModify";

function SpecDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const location = useLocation();
    const {id} = useParams();
    const specCode = location.state ? location.state : id;
    const { spec,deleted } = useSelector(state => state.materialSpecReducer);
    const dispatch = useDispatch();

    const [columnData, setColumnData] = useState([
        { headerName: "코드", valueGetter: (p) => p.data.clientCode, width: 100, resizable: false },
        { headerName: "거래처명", valueGetter: (p) => p.data.clientName },
        { headerName: "대표명", valueGetter: (p) => p.data.representativeName },
        { headerName: "연락처", valueGetter: (p) => p.data.phone },
        { headerName: "", cellRenderer: (p) => <SetMaterialOrderButton clientCode={p.data.clientCode} specCode={specCode}/>, width: 100, resizable: false}
    ]);


    useEffect(() => {
        if (!deleted) {
            dispatch(callMaterialSpecAPI({specCode}));
        } else {
            navigate(`/inventory/material/specs`);
        }

        },[deleted]
    );
    return (
        spec &&
        <>
            <Flex justify='space-between'>
                <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                    {spec.spec.materialName}
                </Text>
                <div>
                    <Button colorScheme='gray' size='xs' onClick={onOpen}>
                        수정
                    </Button>
                    <DeleteAlertButton code={specCode} deleteAPI={callMaterialSpecDeleteAPI}/>
                </div>
                <SpecModify isOpen={isOpen} onClose={onClose} spec={spec} specCode={specCode}/>
                {/* <ClientModify isOpen={isOpen} onClose={onClose} client={client}/> */}
            </Flex>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>코드</Badge><span>{spec.spec.specCode}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>분류</Badge><span>{spec.spec.categoryName}</span
            ></Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>측정단위</Badge><span>{spec.spec.unit}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>안전재고 수량</Badge><span>{spec.spec.safetyStock}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>세부 스펙</Badge><span>{spec.spec.specification}</span>
            </Text>
            <Text fontWeight='bold' color={textColor}>
                <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>비고</Badge><span>{spec.spec.remarks}</span>
            </Text>
            <Card>
                <Heading fontSize='xl' color={textColor} pb='15px'>
                    <Flex justify='space-between'>
                        <span>주문 가능한 업체 목록</span>
                    </Flex>
                </Heading>
                <AgGrid columnsData={columnData} tableData={spec.clients}/>
            </Card>

        </>
    );
}
export default SpecDetail;