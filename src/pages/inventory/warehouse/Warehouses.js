import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Badge, Box, Button, Flex, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {callWarehouseAPI, callWarehousesAPI} from "../../../apis/WarehouseAPICalls";
import {callStoragesAPI, callWarehouseMove} from "../../../apis/StorageAPICalls";
import ColumnsTable from "../../../components/table/ComplexTable";
import { useNavigate } from 'react-router-dom';
import CustomizedTable from "../../../components/table/productTable/CustomizedTable";
import '../../../Products.css'
import StockUpdate from "../../../modals/products/StockUpdate";
import WarehouseUpdate from "../../../modals/products/WarehouseUpdate";
import WarehouseSave from "../../../modals/products/WarehouseSave";

function Warehouses() {
    const dispatch = useDispatch();
    const { warehouses } = useSelector(state => state.warehouseReducer);
    const { storageMove } = useSelector(state => state.storageReducer);
    const { storages } = useSelector(state => state.storageReducer);
    const { warehouse} = useSelector(state => state.warehouseReducer);
    const { isOpen: isWarehouseUpdateModalOpen, onOpen: onWarehouseUpdateModalOpen, onClose: onWarehouseUpdateModalClose } = useDisclosure();
    const { isOpen: isWarehouseSaveModalOpen, onOpen: onWarehouseSaveModalOpen, onClose: onWarehouseSaveModalClose } = useDisclosure();
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callWarehousesAPI());
    }, [dispatch]);
    useEffect(() => {
        if (warehouses && warehouses.length > 0) {
            handleWarehouseSelect(warehouses[0]);
        }
    }, [warehouses]);

    const handleWarehouseSelect = (warehouse) => {
        if(warehouse) {
            setSelectedWarehouse(warehouse);
            dispatch(callWarehouseMove(warehouse.warehouseCode));
            dispatch(callStoragesAPI({warehouseCode: warehouse.warehouseCode}));
            dispatch(callWarehouseAPI({warehouseCode: warehouse.warehouseCode}));
        }
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

// 창고 수정 버튼 핸들러
    const handleWarehouseUpdate = () =>  {
        onWarehouseUpdateModalOpen();
    };
    //창고 추가 버튼 핸들러
    const handleWarehouseAdd = () =>  {
        onWarehouseSaveModalOpen();
    };
    return (
        <Box p={4}>
            <Box mb={4} display="flex" flexWrap="wrap" borderBottom={`2px solid ${inactiveColor}`}>
                {warehouses && warehouses.map(warehouse => (
                    <Button
                        key={warehouse.warehouseCode}
                        onClick={() => handleWarehouseSelect(warehouse)}
                        bg={selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? "blue.500" : "transparent"}
                        border="none"
                        borderTop={`2px solid ${selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? activeBorderColor : "transparent"}`}
                        color={selectedWarehouse?.warehouseCode === warehouse.warehouseCode ? "white" : defaultTextColor}
                        borderRadius="0"
                        m={0}
                        px={4}
                        py={2}
                    >
                        {warehouse.name}
                    </Button>
                ))}
                <Button
                    onClick={handleWarehouseAdd}
                    bg="orange.500"
                    border="none"
                    borderTop={`2px solid transparent`}
                    color="white"
                    m={0}
                    px={4}
                    py={2}
                    ml={2}
                >
                    + 창고 추가
                </Button>
                <WarehouseSave handleWarehouseSelect={handleWarehouseSelect} isOpen={isWarehouseSaveModalOpen} onClose={() => { onWarehouseSaveModalClose(); }} warehouse={warehouse}/>
            </Box>
            {warehouse && storageMove && storages && (
                <>
                    <Flex mt={4}>
                        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mr={4} position="relative">
                            <Button
                                position="absolute"
                                top="4"
                                right="4"
                                colorScheme="orange"
                                onClick={handleWarehouseUpdate}
                            >
                                수정
                            </Button>
                            <WarehouseUpdate handleWarehouseSelect={handleWarehouseSelect} isOpen={isWarehouseUpdateModalOpen} onClose={() => { onWarehouseUpdateModalClose(); }} warehouse={warehouse}/>
                            <Text color={textColor} mb={2} fontSize="lg" fontWeight="bold" fontSize='3xl' fontWeight='800' color={textColor} m='10px'>{warehouse.name}</Text>
                            <Box mb={4}>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>위치</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.location}</Text>
                                </Box>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>크기</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.volume}</Text>
                                </Box>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Badge fontSize='lg' m='5px 0' colorScheme='orange'>담당자</Badge>
                                    <Text fontSize='lg' fontWeight='bold' ml={2}>{warehouse.employeeName}</Text>
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
