import React, { useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import AgGrid from "../../../components/table/AgGrid";
import Card from "../../../components/card/Card";

function PlanOrderDetail({ selectedOrder }) {
    const [columnData] = useState([
        { headerName: "상품번호", valueGetter: (p) => p.data.productCode, width: 100, resizable: false },
        { headerName: "상품명", valueGetter: (p) => p.data.productName },
        { headerName: "수량", valueGetter: (p) => p.data.quantity }
    ]);

    console.log('selectedOrder : ', selectedOrder);

    return (
        <Card>
            <Flex justify="space-between">
                <Text fontSize="xl" fontWeight="800" m="10px">
                    주문 상세
                </Text>
                <Text fontSize="sm" fontWeight="600" mt="15px" mr="10px">
                    주문번호 : {selectedOrder ? selectedOrder.orderCode : ''}
                </Text>
            </Flex>
            <AgGrid columnsData={columnData} tableData={selectedOrder ? selectedOrder.orderProducts : []} />
        </Card>
    )
}

export default PlanOrderDetail;
