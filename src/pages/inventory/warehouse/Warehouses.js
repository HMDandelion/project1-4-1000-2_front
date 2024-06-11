import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { callWarehousesAPI } from "../../../apis/WarehouseAPICalls";
import {callWarehouseMove} from "../../../apis/StorageAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";

function Warehouses() {
    const dispatch = useDispatch();
    const { warehouses } = useSelector(state => state.warehouseReducer);
    const { storages } = useSelector(state => state.storageReducer);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [warehouseDetails, setWarehouseDetails] = useState(null);

    useEffect(() => {
        dispatch(callWarehousesAPI());
    }, [dispatch]);
    useEffect(() => {
        console.log('변화', storages);
    }, [storages]);
    const handleWarehouseSelect = (warehouse) => {
        setSelectedWarehouse(warehouse);
        console.log("gkgk",warehouse.warehouseCode);
        dispatch(callWarehouseMove(warehouse.warehouseCode));
        console.log('storages',storages)
    };

    const activeBorderColor = useColorModeValue("orange.600", "white");
    const inactiveColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");
    const textColor = useColorModeValue("navy", "navy");
    const defaultTextColor = useColorModeValue("secondaryGray.600", "secondaryGray.600");

    const moveColumns = [
        {
            Header: '유형',
            accessor: 'moveType'
        },
        {
            Header: '시간',
            accessor: 'createdAt'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '수량',
            accessor: 'storageQuantity'
        },
        {
            Header: '창고명',
            accessor: 'warehouseName'
        }
    ]

    const moveTableTitle = "이동 내역";     // 테이블 제목
    const baseLink = "/inventory/warehouse";   // 상세조회 React 주소
    const idAccessor = "createdAt";     // id로 사용할 컬럼 지정

    return (
        <Box p={4}>
            <Box mb={4} display="flex" flexWrap="wrap" borderBottom={`2px solid ${inactiveColor}`}>
                {warehouses && warehouses.map(warehouse => (
                    <Button
                        key={warehouse.id}
                        onClick={() => handleWarehouseSelect(warehouse)}
                        bg="transparent"
                        border="none"
                        borderTop={`2px solid ${selectedWarehouse?.id === warehouse.id ? activeBorderColor : "transparent"}`}
                        color={selectedWarehouse?.id === warehouse.id ? textColor : defaultTextColor}
                        borderRadius="0"
                        m={0}
                        px={4}
                        py={2}
                    >
                        {warehouse.name}
                    </Button>
                ))}
            </Box>
            {selectedWarehouse && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
                    <Text color={textColor} mb={2} fontSize="lg" fontWeight="bold">{selectedWarehouse.name}</Text>
                    <Text color={textColor} mb={2}>위치: {selectedWarehouse.location}</Text>
                    <Text color={textColor} mb={2}>크기: {selectedWarehouse.volume}</Text>
                    <Text color={textColor}>담당자: {selectedWarehouse.employeeName}</Text>
                </Box>

            )}
            {console.log("유후",storages)}
            <ColumnsTable columnsData={moveColumns} tableData={storages} tableTitle={moveTableTitle} baseLink={baseLink} idAccessor={idAccessor}/>
        </Box>
    );
}

export default Warehouses;
