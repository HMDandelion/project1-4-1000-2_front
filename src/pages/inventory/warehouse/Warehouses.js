import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Badge, Box, Button, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import { callWarehousesAPI } from "../../../apis/WarehouseAPICalls";
import {callStoragesAPI, callWarehouseMove} from "../../../apis/StorageAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import { useNavigate } from 'react-router-dom';
import CustomizedTable from "../../../components/table/productTable/CustomizedTable";
import '../../../Products.css'

function Warehouses() {
    const dispatch = useDispatch();
    const { warehouses } = useSelector(state => state.warehouseReducer);
    const { storageMove } = useSelector(state => state.storageReducer);
    const { storages } = useSelector(state => state.storageReducer);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callWarehousesAPI());

    }, [dispatch]);
    const handleWarehouseSelect = (warehouse) => {
        setSelectedWarehouse(warehouse);
        if(warehouse) {
            dispatch(callWarehouseMove(warehouse.warehouseCode));
        }
        if(selectedWarehouse) {
            dispatch(callStoragesAPI({warehouseCode: selectedWarehouse.warehouseCode}));
        }
        navigate(`/inventory/warehouse/${warehouse.warehouseCode}`);
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

    const storageColumns = [
        {
            Header: '코드',
            accessor: 'storageCode'
        },
        {
            Header: '상품명',
            accessor: 'productName'
        },
        {
            Header: '수량',
            accessor: 'actualQuantity'
        },
        {
            Header: '창고배정일',
            accessor: 'createdDate',
        },
        {
            Header: '파손',
            accessor: 'destroyQuantity'
        },
        {
            Header: '창고',
            accessor: 'warehouseName'
        },
        {
            Header: '보관일',
            accessor: 'storageDate'
        },
        {
            Header: '',
            accessor: 'isToday'
        }
    ]

    const moveTableTitle = "이동 내역";     // 테이블 제목
    const baseLink = "/inventory/warehouse";   // 상세조회 React 주소
    const idAccessor = "createdAt";     // id로 사용할 컬럼 지정

    const storageTableTitle = "보관 재고 리스트";     // 테이블 제목
    const storageBaseLink = "/inventory/warehouse";   // 상세조회 React 주소
    const storageIdAccessor = "storageCode";     // id로 사용할 컬럼 지정

    let processedStorages;
    if(storages) {
        processedStorages = storages.map(storage => ({
            ...storage,
            isToday: storage.isToday ? (
                <div className="today-label">Today!</div>
            ) : ''
        }));
    }


    return (
        <Box p={4}>
            <Box mb={4} display="flex" flexWrap="wrap" borderBottom={`2px solid ${inactiveColor}`}>
                {warehouses  && warehouses.map(warehouse => (
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
            {selectedWarehouse && storageMove && storages &&(
                <>
                <Flex mt={4}>
                    <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mr={4} position="relative">
                        <Button
                            position="absolute"
                            top="4"
                            right="4"
                            colorScheme="orange"
                            // onClick={handleEditClick} // 수정 버튼 클릭 시 실행될 함수
                        >
                            수정
                        </Button>
                        <Text color={textColor} mb={2} fontSize="lg" fontWeight="bold" fontSize='3xl' fontWeight='800' color={textColor} m='10px'>{selectedWarehouse.name}</Text>
                        <Box mb={4}>
                            <Box display="flex" alignItems="center" mb={4}>
                                <Badge fontSize='lg' m='5px 0' colorScheme='orange'>위치</Badge>
                                <Text fontSize='lg' fontWeight='bold' ml={2}>{selectedWarehouse.location}</Text>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                                <Badge fontSize='lg' m='5px 0' colorScheme='orange'>크기</Badge>
                                <Text fontSize='lg' fontWeight='bold' ml={2}>{selectedWarehouse.volume}</Text>
                            </Box>
                            <Box display="flex" alignItems="center" mb={4}>
                                <Badge fontSize='lg' m='5px 0' colorScheme='orange'>담당자</Badge>
                                <Text fontSize='lg' fontWeight='bold' ml={2}>{selectedWarehouse.employeeName}</Text>
                            </Box>
                        </Box>
                    </Box>

                    <Box flex="2">
                        <CustomizedTable columnsData={moveColumns} tableData={storageMove} tableTitle={moveTableTitle} baseLink={baseLink} idAccessor={idAccessor} />
                    </Box>
                </Flex>
                <Box flex="2">
                <CustomizedTable columnsData={storageColumns} tableData={processedStorages} tableTitle={storageTableTitle} baseLink={storageBaseLink} idAccessor={storageIdAccessor} />
                </Box>
                </>
            )}
        </Box>
    );

}

export default Warehouses;
