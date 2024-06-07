import {
    Text,
    Badge, useColorModeValue
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callSalesClientAPI} from "../../../apis/ClientAPICalls";
import {useParams} from "react-router-dom";
import HorizonLine from "../../../components/common/HorizonLine";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";


function ClientDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const dispatch = useDispatch();
    const { clientCode } = useParams();
    const { client } = useSelector(state => state.clientReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "주문번호", valueGetter: (p) => p.data.orderCode, width: 100, resizable: false },
        { headerName: "주문일시", valueGetter: (p) => p.data.orderDatetime },
        { headerName: "마감기한", valueGetter: (p) => p.data.deadline },
        { headerName: "주문총액", valueGetter: (p) => p.data.totalPrice },
        { headerName: "진행상태", valueGetter: (p) => p.data.status }
    ]);

    useEffect(() => {
        dispatch(callSalesClientAPI({clientCode}));
    }, []);


    return (
        client &&
        <>
            <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                {client.clientName}
            </Text>
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
                <AgGrid columnsData={columnData} tableData={client.orders}/>
            </Card>

        </>
    );
}

export default ClientDetail;