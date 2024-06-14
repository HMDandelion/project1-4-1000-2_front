import {
    Flex, Divider, GridItem, Center, Grid
} from "@chakra-ui/react";

import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";
import ReturnManageDetail from "./ReturnManageDetail";
import {callReturnAPI, callReturnCancelAPI} from "../../../apis/ReturnAPICalls";
import ReturnDetailHeader from "./ReturnDetailHeader";
import OrderProgressDetail from "../order/OrderProgressDetail";
import ReturnRefundDetail from "./ReturnRefundDetail";
import OrderCancelButton from "../../../components/button/OrderCancelButton";

function ReturnDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const returnCode = location.state;
    const { returnData, canceled } = useSelector(state => state.returnReducer);

    const [columnData, setColumnData] = useState([
        { headerName: "상품번호", valueGetter: (p) => p.data.productCode, width: 100, resizable: false },
        { headerName: "상품명", valueGetter: (p) => p.data.productName },
        { headerName: "수량", valueGetter: (p) => p.data.quantity },
        { headerName: "단가", valueGetter: (p) => p.data.refundPrice },
        { headerName: "합계", valueGetter: (p) => p.data.quantity * p.data.refundPrice }
    ]);

    useEffect(() => {
        dispatch(callReturnAPI({returnCode}));
    }, []);

    useEffect(() => {
        if(canceled === true) navigate('/sales/return');
    }, [canceled]);


    return (
        returnData &&
        <>
            <ReturnDetailHeader returnData={returnData}/>
            <Divider mt='20px' mb='20px'/>

            <Grid templateColumns='repeat(15, 1fr)'>
                <GridItem colSpan={7}>
                    <ReturnManageDetail returnData={returnData}/>
                </GridItem>
                <GridItem >
                    <Center height='260px'>
                        <Divider orientation='vertical'/>
                    </Center>
                </GridItem>
                <GridItem colSpan={7}>
                    {
                        returnData.manageType === 'EXCHANGE' ?
                            <OrderProgressDetail type='return' order={returnData.exchangeOrder}/> :
                            <ReturnRefundDetail returnData={returnData}/>
                    }
                </GridItem>
            </Grid>

            <Divider mt='20px'/>

            <Card>
                <AgGrid columnsData={columnData} tableData={returnData.returnProducts}/>
                <Flex justify='flex-end' mt='15px'>
                    <OrderCancelButton isPossible={returnData.returnStatus === 'AWAITING_INSPECTION'
                                                    && returnData.manageStatus === 'RETURN_RECEIVED'}
                                       cancelAPI={callReturnCancelAPI} code={returnData.returnCode}/>
                </Flex>
            </Card>
        </>
    );
}

export default ReturnDetail;